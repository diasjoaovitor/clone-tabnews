import { API_BASE_URL, APP_BASE_URL } from '@/constants'
import { TSessionDto, TUserDto } from '@/dtos'
import { activationModel, userModel } from '@/models'
import orchestrator from '@/tests/orchestrator'
import { TApiResponse } from '@/types'
import { isoStringFieldsToDate } from '@/utils'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
  await orchestrator.deleteAllEmails()
})

describe('Use case: Registration Flow (all successful)', () => {
  let createUserResponseBody: TApiResponse<TUserDto>
  let activationTokenId: string
  let createSessionsResponseBody: TApiResponse<TSessionDto>

  test('Create user account', async () => {
    const createUserResponse = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify({
        username: 'RegistrationFlow',
        email: 'registration.flow@curso.dev',
        password: 'RegistrationFlowPassword'
      })
    })
    expect(createUserResponse.status).toBe(201)

    createUserResponseBody = await createUserResponse.json()
    const expectedData: TApiResponse<TUserDto> = {
      id: expect.any(String),
      username: 'RegistrationFlow',
      email: 'registration.flow@curso.dev',
      features: ['read:activation_token'],
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    }
    expect(isoStringFieldsToDate(createUserResponseBody)).toEqual(expectedData)
  })

  test('Receive activation email', async () => {
    const lastEmail = await orchestrator.getLastEmail()

    expect(lastEmail.sender).toBe('<contato@diasjoaovitor.com.br>')
    expect(lastEmail.recipients[0]).toBe('<registration.flow@curso.dev>')
    expect(lastEmail.subject).toBe('Ative seu cadastro no Clone TabNews!')
    expect(lastEmail.text).toContain('RegistrationFlow')

    activationTokenId = orchestrator.extractUUID(lastEmail.text)!

    expect(lastEmail.text).toContain(
      `${APP_BASE_URL}/cadastro/ativar/${activationTokenId}`
    )

    const activationTokenObject =
      await activationModel.findUniqueValidById(activationTokenId)

    expect(activationTokenObject.user_id).toBe(createUserResponseBody.id)
    expect(activationTokenObject.used_at).toBe(null)
  })

  test('Activate account', async () => {
    const activationResponse = await fetch(
      `${API_BASE_URL}/activations/${activationTokenId}`,
      {
        method: 'PATCH'
      }
    )

    expect(activationResponse.status).toBe(200)

    const activationResponseBody = await activationResponse.json()

    expect(Date.parse(activationResponseBody.used_at)).not.toBeNaN()

    const activatedUser =
      await userModel.findUniqueByUsername('RegistrationFlow')
    expect(activatedUser.features).toEqual([
      'create:session',
      'read:session',
      'update:user'
    ])
  })

  test('Login', async () => {
    const createSessionsResponse = await fetch(`${API_BASE_URL}/sessions`, {
      method: 'POST',
      body: JSON.stringify({
        email: 'registration.flow@curso.dev',
        password: 'RegistrationFlowPassword'
      })
    })

    expect(createSessionsResponse.status).toBe(201)

    createSessionsResponseBody = await createSessionsResponse.json()

    expect(createSessionsResponseBody.user_id).toBe(createUserResponseBody.id)
  })

  test('Get user information', async () => {
    const userResponse = await fetch(`${API_BASE_URL}/user`, {
      headers: {
        cookie: `session_id=${createSessionsResponseBody.token}`
      }
    })

    expect(userResponse.status).toBe(200)

    const userResponseBody = await userResponse.json()

    expect(userResponseBody.id).toBe(createUserResponseBody.id)
  })
})
