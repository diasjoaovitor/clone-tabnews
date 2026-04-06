import { version as uuidVersion } from 'uuid'

import { API_BASE_URL } from '@/constants'
import { TUserActivationTokenDto } from '@/dtos'
import { TErrorResponse } from '@/infra'
import { activationModel, userModel } from '@/models'
import { TUserActivationToken } from '@/repositories'
import orchestrator from '@/tests/orchestrator'
import { TApiResponse } from '@/types'
import { isoStringFieldsToDate } from '@/utils'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('PATCH /api/v1/activations/[token_id]', () => {
  describe('Anonymous user', () => {
    test('With nonexistent token', async () => {
      const response = await fetch(
        `${API_BASE_URL}/activations/256bc49a-132a-42e4-8334-998fd17ee71e`,
        {
          method: 'PATCH'
        }
      )
      expect(response.status).toBe(404)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'NotFoundError',
        message:
          'O token de ativação utilizado não foi encontrado no sistema ou expirou.',
        action: 'Faça um novo cadastro.',
        status_code: 404
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With expired token', async () => {
      jest.useFakeTimers({
        now: new Date(Date.now() - activationModel.EXPIRATION_IN_MILLISECONDS)
      })

      const createdUser = await orchestrator.createUser()
      const expiredActivationToken = await activationModel.create(
        createdUser.id
      )

      jest.useRealTimers()

      const response = await fetch(
        `${API_BASE_URL}/activations/${expiredActivationToken.id}`,
        {
          method: 'PATCH'
        }
      )
      expect(response.status).toBe(404)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'NotFoundError',
        message:
          'O token de ativação utilizado não foi encontrado no sistema ou expirou.',
        action: 'Faça um novo cadastro.',
        status_code: 404
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With already used token', async () => {
      const createdUser = await orchestrator.createUser()
      const activationToken = await activationModel.create(createdUser.id)

      const response1 = await fetch(
        `${API_BASE_URL}/activations/${activationToken.id}`,
        {
          method: 'PATCH'
        }
      )
      expect(response1.status).toBe(200)

      const response2 = await fetch(
        `${API_BASE_URL}/activations/${activationToken.id}`,
        {
          method: 'PATCH'
        }
      )
      expect(response2.status).toBe(404)

      const response2Body = await response2.json()
      const expectedData: TErrorResponse = {
        name: 'NotFoundError',
        message:
          'O token de ativação utilizado não foi encontrado no sistema ou expirou.',
        action: 'Faça um novo cadastro.',
        status_code: 404
      }
      expect(response2Body).toEqual(expectedData)
    })

    test('With valid token', async () => {
      const createdUser = await orchestrator.createUser()
      const activationToken = await activationModel.create(createdUser.id)

      const response = await fetch(
        `${API_BASE_URL}/activations/${activationToken.id}`,
        {
          method: 'PATCH'
        }
      )
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserActivationTokenDto> =
        await response.json()
      const data: TUserActivationToken = isoStringFieldsToDate(responseBody)
      const expectedData: TUserActivationTokenDto = {
        id: activationToken.id,
        used_at: data.used_at,
        user_id: createdUser.id,
        expires_at: activationToken.expires_at,
        created_at: activationToken.created_at,
        updated_at: data.updated_at
      }
      expect(data).toEqual(expectedData)

      expect(uuidVersion(data.id)).toBe(4)
      expect(uuidVersion(data.user_id)).toBe(4)

      expect(data.updated_at > data.created_at).toBe(true)

      data.expires_at.setMilliseconds(0)
      data.created_at.setMilliseconds(0)

      expect(data.expires_at.getTime() - data.created_at.getTime()).toBe(
        activationModel.EXPIRATION_IN_MILLISECONDS
      )

      const activatedUser = await userModel.findUniqueById(data.user_id)
      expect(activatedUser.features).toEqual([
        'create:session',
        'read:session',
        'update:user'
      ])
    })

    test('With valid token but already activated user', async () => {
      const createdUser = await orchestrator.createUser()
      await orchestrator.activateUser(createdUser.id)
      const activationToken = await activationModel.create(createdUser.id)

      const response = await fetch(
        `${API_BASE_URL}/activations/${activationToken.id}`,
        {
          method: 'PATCH'
        }
      )
      expect(response.status).toBe(403)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ForbiddenError',
        message: 'Você não pode mais utilizar tokens de ativação.',
        action: 'Entre em contato com o suporte.',
        status_code: 403
      }
      expect(responseBody).toEqual(expectedData)
    })
  })

  describe('Default user', () => {
    test('With valid token, but already logged in user', async () => {
      const user1 = await orchestrator.createUser()
      await orchestrator.activateUser(user1.id)
      const user1SessionObject = await orchestrator.createSession(user1.id)

      const user2 = await orchestrator.createUser()
      const user2ActivationToken = await activationModel.create(user2.id)

      const response = await fetch(
        `${API_BASE_URL}/activations/${user2ActivationToken.id}`,
        {
          method: 'PATCH',
          headers: {
            Cookie: `session_id=${user1SessionObject.token}`
          }
        }
      )

      expect(response.status).toBe(403)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ForbiddenError',
        message: 'Você não possui permissão para executar esta ação.',
        action:
          'Verifique se o seu usuário possui a feature "read:activation_token"',
        status_code: 403
      }
      expect(responseBody).toEqual(expectedData)
    })
  })
})
