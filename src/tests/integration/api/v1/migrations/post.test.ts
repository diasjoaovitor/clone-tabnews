import { API_BASE_URL } from '@/constants'
import { TErrorResponse } from '@/infra'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('POST to /api/v1/migrations', () => {
  describe('Anonymous user', () => {
    describe('Running pending migrations', () => {
      test('For the first time', async () => {
        const response = await fetch(`${API_BASE_URL}/migrations`, {
          method: 'POST'
        })
        expect(response.status).toBe(403)

        const expectedData: TErrorResponse = {
          name: 'ForbiddenError',
          message: 'Você não possui permissão para executar esta ação.',
          action:
            'Verifique se o seu usuário possui a feature "create:migration"',
          status_code: 403
        }
        expect(expectedData).toEqual(expectedData)
      })
    })
  })

  describe('Default user', () => {
    test('Running pending migrations', async () => {
      const createdUser = await orchestrator.createUser()
      const activatedUser = await orchestrator.activateUser(createdUser.id)
      const sessionObject = await orchestrator.createSession(activatedUser.id)

      const response = await fetch(`${API_BASE_URL}/migrations`, {
        method: 'POST',
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(403)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ForbiddenError',
        message: 'Você não possui permissão para executar esta ação.',
        action:
          'Verifique se o seu usuário possui a feature "create:migration"',
        status_code: 403
      }
      expect(responseBody).toEqual(expectedData)
    })
  })

  describe('Privileged user', () => {
    test('With `create:migration`', async () => {
      const createdUser = await orchestrator.createUser()
      const activatedUser = await orchestrator.activateUser(createdUser.id)
      await orchestrator.addFeaturesToUser(createdUser.id, ['create:migration'])
      const sessionObject = await orchestrator.createSession(activatedUser.id)

      const response = await fetch(`${API_BASE_URL}/migrations`, {
        method: 'POST',
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(200)

      const responseBody = await response.json()
      expect(Array.isArray(responseBody)).toBe(true)
    })
  })
})
