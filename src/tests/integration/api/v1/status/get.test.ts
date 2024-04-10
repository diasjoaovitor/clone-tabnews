import { database } from '@/infra/database'

describe('GET to /api/v1/status', () => {
  test('should return 200', async () => {
    const result = await database.query('SELECT 1 + 1;')
    const response = await fetch('http://localhost:3000/api/v1/status')
    expect(result).toBeDefined()
    expect(response.status).toBe(200)
  })
})
