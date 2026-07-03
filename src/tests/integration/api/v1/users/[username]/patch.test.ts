import { version as uuidVersion } from 'uuid'

import { API_BASE_URL } from '@/constants'
import { TUserDto } from '@/dtos'
import { TErrorResponse } from '@/infra'
import { passwordModel } from '@/models'
import { userRepository } from '@/repositories'
import { TApiResponse } from '@/tests/_types'
import { isoStringFieldsToDate } from '@/tests/_utils'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('PATCH /api/v1/users/[username]', () => {
  describe('Anonymous user', () => {
    test("With unique 'username'", async () => {
      const createdUser1 = await orchestrator.createUser({
        username: 'uniqueUser1'
      })

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser1.username}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            username: 'uniqueUser2'
          })
        }
      )

      expect(response.status).toBe(403)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        action: 'Verifique se o seu usuário possui a feature "update:user"',
        message: 'Você não possui permissão para executar esta ação.',
        name: 'ForbiddenError',
        status_code: 403
      }
      expect(responseBody).toEqual(expectedData)
    })
  })

  describe('Default user', () => {
    test("With nonexistent 'username'", async () => {
      const { sessionObject } =
        await orchestrator.createActivatedUserWithSession()
      const response = await fetch(`${API_BASE_URL}/users/UsuarioInexistente`, {
        method: 'PATCH',
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(404)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'NotFoundError',
        message: 'O username informado não foi encontrado no sistema.',
        action: 'Verifique se o username está digitado corretamente.',
        status_code: 404
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With invalid data', async () => {
      const { createdUser, sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser.username}`,
        {
          method: 'PATCH',
          headers: {
            Cookie: `session_id=${sessionObject.token}`
          },
          body: JSON.stringify({
            email: 'invalid-email'
          })
        }
      )
      expect(response.status).toBe(400)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ValidationError',
        message: '✖ O email informado não é válido.\n  → at email',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400
      }
      expect(responseBody).toEqual(expectedData)
    })

    test("With duplicated 'username'", async () => {
      const { sessionObject: sessionObject1 } =
        await orchestrator.createActivatedUserWithSession({
          username: 'user1'
        })

      await orchestrator.createUser({
        username: 'user2'
      })

      const response = await fetch(`${API_BASE_URL}/users/user1`, {
        method: 'PATCH',
        headers: {
          Cookie: `session_id=${sessionObject1.token}`
        },
        body: JSON.stringify({
          username: 'user2'
        })
      })
      expect(response.status).toBe(409)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ValidationError',
        message: 'O username informado já está sendo utilizado.',
        action: 'Utilize outro username para realizar esta operação.',
        status_code: 409
      }
      expect(responseBody).toEqual(expectedData)
    })

    test("With duplicated 'email'", async () => {
      const { createdUser: createdUser1, sessionObject: sessionObject1 } =
        await orchestrator.createActivatedUserWithSession({
          email: 'email1@curso.dev'
        })

      await orchestrator.createUser({
        email: 'email2@curso.dev'
      })

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser1.username}`,
        {
          headers: {
            Cookie: `session_id=${sessionObject1.token}`
          },
          method: 'PATCH',
          body: JSON.stringify({
            email: 'email2@curso.dev'
          })
        }
      )
      expect(response.status).toBe(409)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ValidationError',
        message: 'O email informado já está sendo utilizado.',
        action: 'Utilize outro email para realizar esta operação.',
        status_code: 409
      }
      expect(responseBody).toEqual(expectedData)
    })

    test("With existing 'username' with a different case", async () => {
      const { createdUser: createdUser1, sessionObject: sessionObject1 } =
        await orchestrator.createActivatedUserWithSession({
          username: 'existingUsername1'
        })

      await orchestrator.createUser({
        username: 'existingUsername2'
      })

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser1.username}`,
        {
          method: 'PATCH',
          headers: {
            Cookie: `session_id=${sessionObject1.token}`
          },
          body: JSON.stringify({
            username: 'EXISTINGUSERNAME2'
          })
        }
      )
      expect(response.status).toBe(409)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ValidationError',
        message: 'O username informado já está sendo utilizado.',
        action: 'Utilize outro username para realizar esta operação.',
        status_code: 409
      }
      expect(responseBody).toEqual(expectedData)
    })

    test("With valid and unique 'username'", async () => {
      const { createdUser, sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser.username}`,
        {
          method: 'PATCH',
          headers: {
            Cookie: `session_id=${sessionObject.token}`
          },
          body: JSON.stringify({
            username: 'uniqueUser2'
          })
        }
      )
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: createdUser.id,
        username: 'uniqueUser2',
        features: ['create:session', 'read:session', 'update:user'],
        email: createdUser.email,
        created_at: createdUser.created_at,
        updated_at: data.updated_at
      }
      expect(data).toEqual(expectedData)
      expect(uuidVersion(data.id)).toBe(4)
      expect(data.updated_at > data.created_at).toBe(true)
    })

    test("With valid and unique 'email'", async () => {
      const { createdUser, sessionObject } =
        await orchestrator.createActivatedUserWithSession({
          email: 'uniqueEmail1@curso.dev'
        })

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser.username}`,
        {
          method: 'PATCH',
          headers: {
            Cookie: `session_id=${sessionObject.token}`
          },
          body: JSON.stringify({
            email: 'uniqueEmail2@curso.dev'
          })
        }
      )
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: createdUser.id,
        username: createdUser.username,
        email: 'uniqueEmail2@curso.dev',
        features: ['create:session', 'read:session', 'update:user'],
        created_at: createdUser.created_at,
        updated_at: data.updated_at
      }
      expect(data).toEqual(expectedData)
    })

    test("With new 'password'", async () => {
      const { createdUser, sessionObject } =
        await orchestrator.createActivatedUserWithSession({
          password: 'newPassword1'
        })

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser.username}`,
        {
          method: 'PATCH',
          headers: {
            Cookie: `session_id=${sessionObject.token}`
          },
          body: JSON.stringify({
            password: 'newPassword2'
          })
        }
      )
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      expect(uuidVersion(responseBody.id)).toBe(4)
      expect(responseBody.updated_at > responseBody.created_at).toBe(true)

      const userInDatabase = await userRepository.findUniqueByUsername(
        createdUser.username
      )

      const correctPasswordMatch = await passwordModel.compare(
        'newPassword2',
        userInDatabase!.password
      )
      expect(correctPasswordMatch).toBe(true)

      const incorrectPasswordMatch = await passwordModel.compare(
        'newPassword1',
        userInDatabase!.password
      )
      expect(incorrectPasswordMatch).toBe(false)
    })

    test("With own 'username' with a different case", async () => {
      const { createdUser, activatedUser, sessionObject } =
        await orchestrator.createActivatedUserWithSession({
          username: 'OwnUsername'
        })

      const response = await fetch(`${API_BASE_URL}/users/OWNUSERNAME`, {
        method: 'PATCH',
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        },
        body: JSON.stringify({
          username: 'ownusername'
        })
      })
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: createdUser.id,
        username: 'ownusername',
        email: createdUser.email,
        features: activatedUser.features,
        created_at: createdUser.created_at,
        updated_at: data.updated_at
      }
      expect(data).toEqual(expectedData)
    })

    test("With another user's 'username'", async () => {
      const { sessionObject: sessionObject1 } =
        await orchestrator.createActivatedUserWithSession()

      const createdUser2 = await orchestrator.createUser()
      await orchestrator.activateUser(createdUser2.id)

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser2.username}`,
        {
          method: 'PATCH',
          headers: {
            Cookie: `session_id=${sessionObject1.token}`
          },
          body: JSON.stringify({
            username: 'uniqueUser3'
          })
        }
      )
      expect(response.status).toBe(403)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ForbiddenError',
        message: 'Você não possui permissão para atualizar outro usuário.',
        action:
          'Verifique se você possui a feature necessária para atualizar outro usuário.',
        status_code: 403
      }
      expect(responseBody).toEqual(expectedData)
    })

    test("With own 'email' with a different case", async () => {
      const { createdUser, activatedUser, sessionObject } =
        await orchestrator.createActivatedUserWithSession({
          email: 'OwnEmail@curso.dev'
        })

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser.username}`,
        {
          method: 'PATCH',
          headers: {
            Cookie: `session_id=${sessionObject.token}`
          },
          body: JSON.stringify({
            email: 'OWNEMAIL@curso.dev'
          })
        }
      )
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: createdUser.id,
        username: createdUser.username,
        email: 'OWNEMAIL@curso.dev',
        features: activatedUser.features,
        created_at: createdUser.created_at,
        updated_at: data.updated_at
      }
      expect(data).toEqual(expectedData)
    })
  })

  describe('Privileged user', () => {
    test("With `update:user:others`, updating another user's 'username'", async () => {
      const { sessionObject: sessionObject1 } =
        await orchestrator.createActivatedUserWithSession(undefined, [
          'update:user:others'
        ])

      const createdUser2 = await orchestrator.createUser()
      const activatedUser2 = await orchestrator.activateUser(createdUser2.id)

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser2.username}`,
        {
          method: 'PATCH',
          headers: {
            Cookie: `session_id=${sessionObject1.token}`
          },
          body: JSON.stringify({
            username: 'uniqueUser4'
          })
        }
      )
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: createdUser2.id,
        username: 'uniqueUser4',
        features: activatedUser2.features,
        created_at: createdUser2.created_at,
        updated_at: data.updated_at
      }
      expect(data).toEqual(expectedData)
    })
  })
})
