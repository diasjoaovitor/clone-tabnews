import { API_BASE_URL } from '@/shared/constants/base-url'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
})

describe('POST to /api/v1/migrations', () => {
  describe('Anonymous user', () => {
    describe('Running pending migrations', () => {
      test('For the first time', async () => {
        const response = await fetch(`${API_BASE_URL}/migrations`, {
          method: 'POST'
        })
        expect(response.status).toBe(201)

        const responseBody = await response.json()
        expect(Array.isArray(responseBody)).toBe(true)
        expect(responseBody.length).toBeGreaterThan(0)
      })

      test('For the second time', async () => {
        const response = await fetch(`${API_BASE_URL}/migrations`, {
          method: 'POST'
        })
        expect(response.status).toBe(200)

        const responseBody = await response.json()

        expect(Array.isArray(responseBody)).toBe(true)
        expect(responseBody.length).toBe(0)
      })
    })
  })
})
