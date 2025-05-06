import { version as uuidVersion } from 'uuid'

import { password } from '@/models'
import { userRepository } from '@/repositories'
import orchestrator from '@/tests/orchestrator'
import { TUser } from '@/types'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('PATCH /api/v1/users/[username]', () => {
  describe('Anonymous user', () => {
    describe('Success', () => {
      test("With valid and unique 'username'", async () => {
        const createdUser1 = await orchestrator.createUser({
          username: 'uniqueUser1'
        })

        const response = await fetch(
          `http://localhost:3000/api/v1/users/${createdUser1.username}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: 'uniqueUser2'
            })
          }
        )

        expect(response.status).toBe(200)

        const responseBody = await response.json()

        expect(responseBody).toEqual({
          id: responseBody.id,
          username: 'uniqueUser2',
          email: responseBody.email,
          password: responseBody.password,
          created_at: responseBody.created_at,
          updated_at: responseBody.updated_at
        })

        expect(uuidVersion(responseBody.id)).toBe(4)
        expect(Date.parse(responseBody.created_at)).not.toBeNaN()
        expect(Date.parse(responseBody.updated_at)).not.toBeNaN()

        expect(responseBody.updated_at > responseBody.created_at).toBe(true)
      })

      test("With valid and unique 'email'", async () => {
        const createdUser1 = await orchestrator.createUser({
          email: 'uniqueEmail1@curso.dev'
        })

        const response = await fetch(
          `http://localhost:3000/api/v1/users/${createdUser1.username}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: 'uniqueEmail2@curso.dev'
            })
          }
        )

        expect(response.status).toBe(200)

        const responseBody = await response.json()

        expect(responseBody).toEqual({
          id: responseBody.id,
          username: responseBody.username,
          email: 'uniqueEmail2@curso.dev',
          password: responseBody.password,
          created_at: responseBody.created_at,
          updated_at: responseBody.updated_at
        })

        expect(uuidVersion(responseBody.id)).toBe(4)
        expect(Date.parse(responseBody.created_at)).not.toBeNaN()
        expect(Date.parse(responseBody.updated_at)).not.toBeNaN()

        expect(responseBody.updated_at > responseBody.created_at).toBe(true)
      })

      test("With new 'password'", async () => {
        const createdUser1 = await orchestrator.createUser({
          password: 'newPassword1'
        })

        const response = await fetch(
          `http://localhost:3000/api/v1/users/${createdUser1.username}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              password: 'newPassword2'
            })
          }
        )

        expect(response.status).toBe(200)

        const responseBody = await response.json()

        expect(uuidVersion(responseBody.id)).toBe(4)
        expect(Date.parse(responseBody.created_at)).not.toBeNaN()
        expect(Date.parse(responseBody.updated_at)).not.toBeNaN()

        expect(responseBody.updated_at > responseBody.created_at).toBe(true)

        const userInDatabase = (await userRepository.findOneByUsername(
          createdUser1.username
        )) as TUser
        const correctPasswordMatch = await password.compare(
          'newPassword2',
          userInDatabase.password
        )

        const incorrectPasswordMatch = await password.compare(
          'newPassword1',
          userInDatabase.password
        )

        expect(correctPasswordMatch).toBe(true)
        expect(incorrectPasswordMatch).toBe(false)
      })

      test("With own 'username' with a different case", async () => {
        await orchestrator.createUser({
          username: 'OwnUsername'
        })

        const response = await fetch(
          'http://localhost:3000/api/v1/users/OWNUSERNAME',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: 'ownusername'
            })
          }
        )

        expect(response.status).toBe(200)

        const responseBody = await response.json()

        expect(responseBody).toEqual({
          id: responseBody.id,
          username: 'ownusername',
          email: responseBody.email,
          password: responseBody.password,
          created_at: responseBody.created_at,
          updated_at: responseBody.updated_at
        })
      })

      test("With own 'email' with a different case", async () => {
        const createdUser = await orchestrator.createUser({
          email: 'OwnEmail@curso.dev'
        })

        const response = await fetch(
          `http://localhost:3000/api/v1/users/${createdUser.username}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: 'OWNEMAIL@curso.dev'
            })
          }
        )

        expect(response.status).toBe(200)

        const responseBody = await response.json()

        expect(responseBody).toEqual({
          id: responseBody.id,
          username: responseBody.username,
          email: 'OWNEMAIL@curso.dev',
          password: responseBody.password,
          created_at: responseBody.created_at,
          updated_at: responseBody.updated_at
        })
      })
    })

    describe('Failure', () => {
      test("With nonexistent 'username'", async () => {
        const response = await fetch(
          'http://localhost:3000/api/v1/users/UsuarioInexistente',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
          }
        )

        expect(response.status).toBe(404)

        const responseBody = await response.json()

        expect(responseBody).toEqual({
          name: 'NotFoundError',
          message: 'O username informado não foi encontrado no sistema.',
          action: 'Verifique se o username está digitado corretamente.',
          status_code: 404
        })
      })

      test("With duplicated 'username'", async () => {
        await orchestrator.createUser({
          username: 'user1'
        })

        await orchestrator.createUser({
          username: 'user2'
        })

        const response = await fetch(
          'http://localhost:3000/api/v1/users/user2',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: 'user1'
            })
          }
        )

        expect(response.status).toBe(409)

        const responseBody = await response.json()

        expect(responseBody).toEqual({
          name: 'ValidationError',
          message: 'O username informado já está sendo utilizado.',
          action: 'Utilize outro username para realizar esta operação.',
          status_code: 409
        })
      })

      test("With duplicated 'email'", async () => {
        await orchestrator.createUser({
          email: 'email1@curso.dev'
        })

        const createdUser2 = await orchestrator.createUser({
          email: 'email2@curso.dev'
        })

        const response = await fetch(
          `http://localhost:3000/api/v1/users/${createdUser2.username}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: 'email1@curso.dev'
            })
          }
        )

        expect(response.status).toBe(409)

        const responseBody = await response.json()

        expect(responseBody).toEqual({
          name: 'ValidationError',
          message: 'O email informado já está sendo utilizado.',
          action: 'Utilize outro email para realizar esta operação.',
          status_code: 409
        })
      })

      test("With existing 'username' with a different case", async () => {
        await orchestrator.createUser({
          username: 'existingUsername1'
        })

        const createdUser2 = await orchestrator.createUser({
          username: 'existingUsername2'
        })

        const response = await fetch(
          `http://localhost:3000/api/v1/users/${createdUser2.username}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: 'EXISTINGUSERNAME1'
            })
          }
        )

        expect(response.status).toBe(409)

        const responseBody = await response.json()

        expect(responseBody).toEqual({
          name: 'ValidationError',
          message: 'O username informado já está sendo utilizado.',
          action: 'Utilize outro username para realizar esta operação.',
          status_code: 409
        })
      })
    })
  })
})
