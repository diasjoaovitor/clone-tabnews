import { version as uuidVersion } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'

import { API_BASE_URL } from '@/constants/base-url'
import { UserDto } from '@/dtos/user-dto'
import { ErrorResponse } from '@/infra/errors'
import { passwordModel } from '@/models/password-model/model'
import { userModel } from '@/models/user-model/model'
import { ApiResponse } from '@/tests/_types/generics'
import { isoStringFieldsToDate } from '@/tests/_utils/formatters'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
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

      const responseBody: ApiResponse<UserDto> = await response.json()
      const data: UserDto = isoStringFieldsToDate(responseBody)
      const expectedData: UserDto = {
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
      const expectedData: ErrorResponse = {
        name: 'ValidationError',
        message: 'O username é obrigatório.',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400,
        fields: {
          username: 'O username é obrigatório.',
          email: 'O email informado não é válido.',
          password: 'A senha é obrigatória.'
        }
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
      const expectedData: ErrorResponse = {
        name: 'ValidationError',
        message: 'O email informado não é válido.',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400,
        fields: {
          email: 'O email informado não é válido.',
          password: 'A senha é obrigatória.'
        }
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
      const expectedData: ErrorResponse = {
        name: 'ValidationError',
        message: 'A senha é obrigatória.',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400,
        fields: {
          password: 'A senha é obrigatória.'
        }
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
      const expectedData: ErrorResponse = {
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
      const expectedData: ErrorResponse = {
        name: 'ValidationError',
        message: 'O username informado já está sendo utilizado.',
        action: 'Utilize outro username para realizar esta operação.',
        status_code: 409
      }
      expect(response2Body).toEqual(expectedData)
    })

    test("With simultaneous requests for the same 'username'", async () => {
      const responses = await Promise.all(
        ['simultaneous1@curso.dev', 'simultaneous2@curso.dev'].map((email) =>
          fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            body: JSON.stringify({
              username: 'simultaneousUsername',
              email,
              password: 'senha123'
            })
          })
        )
      )
      const statuses = responses
        .map(({ status }) => status)
        .toSorted((a, b) => a - b)
      expect(statuses).toEqual([201, 409])

      const conflictResponse = responses.find(({ status }) => status === 409)!
      const conflictResponseBody = await conflictResponse.json()
      const expectedData: ErrorResponse = {
        name: 'ValidationError',
        message: 'O username informado já está sendo utilizado.',
        action: 'Utilize outro username para realizar esta operação.',
        status_code: 409
      }
      expect(conflictResponseBody).toEqual(expectedData)
    })
  })

  describe('Default user', () => {
    test('With unique and valid data', async () => {
      const { sessionObject: user1SessionObject } =
        await orchestrator.createActivatedUserWithSession()

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
      const expectedData: ErrorResponse = {
        name: 'ForbiddenError',
        message: 'Você não possui permissão para executar esta ação.',
        action: 'Verifique se o seu usuário possui a feature "create:user"',
        status_code: 403
      }
      expect(user2ResponseBody).toEqual(expectedData)
    })
  })
})
