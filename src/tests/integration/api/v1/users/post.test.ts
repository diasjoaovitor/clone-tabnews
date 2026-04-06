import { version as uuidVersion } from 'uuid'

import { API_BASE_URL } from '@/constants'
import { TUserDto } from '@/dtos'
import { TErrorResponse } from '@/infra'
import { passwordModel, userModel } from '@/models'
import orchestrator from '@/tests/orchestrator'
import { TApiResponse } from '@/types'
import { isoStringFieldsToDate } from '@/utils'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('POST /api/v1/users', () => {
  describe('Anonymous user', () => {
    test('With unique and valid data', async () => {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({
          username: 'filipedeschamps',
          email: 'contato@curso.dev',
          password: 'senha123'
        })
      })
      expect(response.status).toBe(201)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: expect.any(String),
        username: 'filipedeschamps',
        email: 'contato@curso.dev',
        features: ['read:activation_token'],
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      }
      expect(data).toEqual(expectedData)
      expect(uuidVersion(data.id)).toBe(4)

      const userInDatabase =
        await userModel.findUniqueByUsername('filipedeschamps')

      const correctPasswordMatch = await passwordModel.compare(
        'senha123',
        userInDatabase.password
      )
      expect(correctPasswordMatch).toBe(true)

      const incorrectPasswordMatch = await passwordModel.compare(
        'SenhaErrada',
        userInDatabase.password
      )
      expect(incorrectPasswordMatch).toBe(false)
    })

    test("With missing 'username'", async () => {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({})
      })
      expect(response.status).toBe(400)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ValidationError',
        message:
          '✖ O username é obrigatório.\n' +
          '  → at username\n' +
          '✖ O email informado não é válido.\n' +
          '  → at email\n' +
          '✖ A senha é obrigatória.\n' +
          '  → at password',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400
      }
      expect(responseBody).toEqual(expectedData)
    })

    test("With missing 'email'", async () => {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({
          username: 'filipedeschamps'
        })
      })
      expect(response.status).toBe(400)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ValidationError',
        message:
          '✖ O email informado não é válido.\n' +
          '  → at email\n' +
          '✖ A senha é obrigatória.\n' +
          '  → at password',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400
      }
      expect(responseBody).toEqual(expectedData)
    })

    test("With missing 'password'", async () => {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({
          username: 'filipedeschamps',
          email: 'contato@curso.dev'
        })
      })
      expect(response.status).toBe(400)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ValidationError',
        message: '✖ A senha é obrigatória.\n  → at password',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400
      }
      expect(responseBody).toEqual(expectedData)
    })

    test("With duplicated 'email'", async () => {
      const response1 = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({
          username: 'emailduplicado1',
          email: 'duplicado@curso.dev',
          password: 'senha123'
        })
      })
      expect(response1.status).toBe(201)

      const response2 = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({
          username: 'emailduplicado2',
          email: 'Duplicado@curso.dev',
          password: 'senha123'
        })
      })
      expect(response2.status).toBe(409)

      const response2Body = await response2.json()
      const expectedData: TErrorResponse = {
        name: 'ValidationError',
        message: 'O email informado já está sendo utilizado.',
        action: 'Utilize outro email para realizar esta operação.',
        status_code: 409
      }
      expect(response2Body).toEqual(expectedData)
    })

    test("With duplicated 'username'", async () => {
      const response1 = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({
          username: 'usernameduplicado',
          email: 'usernameduplicado1@curso.dev',
          password: 'senha123'
        })
      })
      expect(response1.status).toBe(201)

      const response2 = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({
          username: 'UsernameDuplicado',
          email: 'usernameduplicado2@curso.dev',
          password: 'senha123'
        })
      })
      expect(response2.status).toBe(409)

      const response2Body = await response2.json()
      const expectedData: TErrorResponse = {
        name: 'ValidationError',
        message: 'O username informado já está sendo utilizado.',
        action: 'Utilize outro username para realizar esta operação.',
        status_code: 409
      }
      expect(response2Body).toEqual(expectedData)
    })
  })

  describe('Default user', () => {
    test('With unique and valid data', async () => {
      const user1 = await orchestrator.createUser()
      await orchestrator.activateUser(user1.id)
      const user1SessionObject = await orchestrator.createSession(user1.id)

      const user2Response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          Cookie: `session_id=${user1SessionObject.token}`
        },
        body: JSON.stringify({
          username: 'usuariologado',
          email: 'usuariologado@curso.dev',
          password: 'senha123'
        })
      })
      expect(user2Response.status).toBe(403)

      const user2ResponseBody = await user2Response.json()
      const expectedData: TErrorResponse = {
        name: 'ForbiddenError',
        message: 'Você não possui permissão para executar esta ação.',
        action: 'Verifique se o seu usuário possui a feature "create:user"',
        status_code: 403
      }
      expect(user2ResponseBody).toEqual(expectedData)
    })
  })
})
