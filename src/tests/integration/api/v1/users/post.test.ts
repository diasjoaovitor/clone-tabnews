import { version as uuidVersion } from 'uuid'

import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('POST /api/v1/users', () => {
  describe('Anonymous user', () => {
    test('With unique and valid data', async () => {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'filipedeschamps',
          email: 'contato@curso.dev',
          password: 'senha123'
        })
      })

      expect(response.status).toBe(201)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: 'filipedeschamps',
        email: 'contato@curso.dev',
        password: 'senha123',
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at
      })

      expect(uuidVersion(responseBody.id)).toBe(4)
      expect(Date.parse(responseBody.created_at)).not.toBeNaN()
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN()
    })

    test("With missing 'username'", async () => {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })

      expect(response.status).toBe(400)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        name: 'ValidationError',
        message: 'O username é obrigatório.',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400
      })
    })

    test("With missing 'email'", async () => {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'filipedeschamps'
        })
      })

      expect(response.status).toBe(400)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        name: 'ValidationError',
        message: 'O email é obrigatório.',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400
      })
    })

    test("With missing 'password'", async () => {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'filipedeschamps',
          email: 'contato@curso.dev'
        })
      })

      expect(response.status).toBe(400)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        name: 'ValidationError',
        message: 'A senha é obrigatória.',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400
      })
    })

    test("With duplicated 'email'", async () => {
      const response1 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'emailduplicado1',
          email: 'duplicado@curso.dev',
          password: 'senha123'
        })
      })

      expect(response1.status).toBe(201)

      const response2 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'emailduplicado2',
          email: 'Duplicado@curso.dev',
          password: 'senha123'
        })
      })

      expect(response2.status).toBe(409)

      const response2Body = await response2.json()

      expect(response2Body).toEqual({
        name: 'ValidationError',
        message: 'O email informado já está sendo utilizado.',
        action: 'Utilize outro email para realizar o cadastro.',
        status_code: 409
      })
    })

    test("With duplicated 'username'", async () => {
      const response1 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'usernameduplicado',
          email: 'usernameduplicado1@curso.dev',
          password: 'senha123'
        })
      })

      expect(response1.status).toBe(201)

      const response2 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'UsernameDuplicado',
          email: 'usernameduplicado2@curso.dev',
          password: 'senha123'
        })
      })

      expect(response2.status).toBe(409)

      const response2Body = await response2.json()

      expect(response2Body).toEqual({
        name: 'ValidationError',
        message: 'O username informado já está sendo utilizado.',
        action: 'Utilize outro username para realizar o cadastro.',
        status_code: 409
      })
    })
  })
})
