import { TStatusBody } from '@/app/api/v1/status/route'

describe('GET to /api/v1/status', () => {
  test('should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status')
    expect(response.status).toBe(200)

    const data: TStatusBody = await response.json()
    const { updated_at } = data

    const parsedUpdatedAt = new Date(updated_at).toISOString()
    expect(updated_at).toBe(parsedUpdatedAt)

    const expectedData: TStatusBody = {
      updated_at,
      dependencies: {
        database: {
          version: '16.0',
          max_connections: '100',
          opened_connections: 1
        }
      }
    }
    expect(data).toEqual(expectedData)
  })
})
