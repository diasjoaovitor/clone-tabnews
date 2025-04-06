import orchestrator from '@/tests/orchestrator'
import { TUser } from '@/types'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

let user: TUser

describe('PUT /api/v1/users/[username]', () => {
  describe('Anonymous user', () => {
    test('With valid data', async () => {
      const createdUser = await orchestrator.createUser({
        username: 'filipedeschamps',
        email: 'contato@curso.dev',
        password: 'senha123'
      })

      const response = await fetch(
        `http://localhost:3000/api/v1/users/${createdUser.username}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...createdUser,
            username: 'filipedeschamps2',
            created_at: 'anything',
            updated_at: 'anything'
          })
        }
      )

      const responseBody = await response.json()

      user = responseBody

      expect(responseBody.username).toBe('filipedeschamps2')
      expect(responseBody.email).toBe(createdUser.email)
      expect(responseBody.password).toBe(createdUser.password)
      expect(Date.parse(responseBody.created_at)).not.toBeNaN()
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN()
    })

    test("With invalid 'id'", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${user.username}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: 'filipedeschamps',
            email: 'contato@curso.dev',
            password: 'senha123',
            id: '123'
          })
        }
      )

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        name: 'ValidationError',
        message: 'O id informado não é um uuid válido.',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400
      })
    })

    test("With non-existent 'id'", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${user.username}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: 'filipedeschamps',
            email: 'contato@curso.dev',
            password: 'senha123',
            id: '20a17d2e-a105-4963-ad0a-a5c2aaad40f0'
          })
        }
      )

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        name: 'NotFoundError',
        message: 'Usuário não encontrado.',
        action: 'Verifique o id informado e tente novamente.',
        status_code: 404
      })
    })

    test("With missing 'email'", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${user.username}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...user,
            email: ''
          })
        }
      )

      expect(response.status).toBe(400)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        name: 'ValidationError',
        message: 'O email informado não é válido.',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400
      })
    })

    test("With missing 'password'", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${user.username}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...user,
            password: ''
          })
        }
      )

      expect(response.status).toBe(400)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        name: 'ValidationError',
        message: 'A senha deve conter pelo menos 8 caracteres.',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400
      })
    })

    test("With duplicated 'email'", async () => {
      await orchestrator.createUser({
        username: 'outro-username',
        email: 'outro-email@curso.dev',
        password: 'senha123'
      })

      const response = await fetch(
        `http://localhost:3000/api/v1/users/${user.username}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...user,
            email: 'outro-email@curso.dev'
          })
        }
      )

      expect(response.status).toBe(409)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        name: 'ValidationError',
        message: 'O email informado já está sendo utilizado.',
        action: 'Utilize outro email para realizar o cadastro.',
        status_code: 409
      })
    })

    test("With duplicated 'username'", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${user.username}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...user,
            username: 'outro-username'
          })
        }
      )

      expect(response.status).toBe(409)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        name: 'ValidationError',
        message: 'O username informado já está sendo utilizado.',
        action: 'Utilize outro username para realizar o cadastro.',
        status_code: 409
      })
    })
  })
})
