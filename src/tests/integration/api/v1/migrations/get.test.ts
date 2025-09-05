import { API_BASE_URL } from '@/shared/constants/base-url'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
})

describe('GET to /api/v1/migrations', () => {
  describe('Anonymous user', () => {
    test('Retrieving pending migrations', async () => {
      const response = await fetch(`${API_BASE_URL}/migrations`)
      expect(response.status).toBe(200)

      const responseBody = await response.json()

      expect(Array.isArray(responseBody)).toBe(true)
      expect(responseBody.length).toBeGreaterThan(0)
    })
  })
})
