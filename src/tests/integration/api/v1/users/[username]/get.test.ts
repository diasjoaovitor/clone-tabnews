import { version as uuidVersion } from 'uuid'

import { API_BASE_URL } from '@/shared/constants/base-url'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('GET /api/v1/users/[username]', () => {
  describe('Anonymous user', () => {
    test('With exact case match', async () => {
      await orchestrator.createUser({
        username: 'MesmoCase'
      })

      const response = await fetch(`${API_BASE_URL}/users/MesmoCase`)

      expect(response.status).toBe(200)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: 'MesmoCase',
        email: responseBody.email,
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at
      })

      expect(uuidVersion(responseBody.id)).toBe(4)
      expect(Date.parse(responseBody.created_at)).not.toBeNaN()
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN()
    })

    test('With case mismatch', async () => {
      await orchestrator.createUser({
        username: 'CaseDiferente'
      })

      const response = await fetch(`${API_BASE_URL}/users/casediferente`)

      expect(response.status).toBe(200)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: 'CaseDiferente',
        email: responseBody.email,
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at
      })

      expect(uuidVersion(responseBody.id)).toBe(4)
      expect(Date.parse(responseBody.created_at)).not.toBeNaN()
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN()
    })

    test('With nonexistent username', async () => {
      const response = await fetch(`${API_BASE_URL}/users/UsuarioInexistente`)

      expect(response.status).toBe(404)

      const responseBody = await response.json()

      expect(responseBody).toEqual({
        name: 'NotFoundError',
        message: 'O username informado não foi encontrado no sistema.',
        action: 'Verifique se o username está digitado corretamente.',
        status_code: 404
      })
    })
  })
})
