import orchestrator from '@/tests/orchestrator'

const url = 'http://localhost:3000/api/v1/migrations'

beforeAll(orchestrator.waitForAllServices)

describe('Not allowed methods to /api/v1/migrations', () => {
  test('should return 405 and the response error', async () => {
    const response1 = await fetch(url, {
      method: 'PUT'
    })
    expect(response1.status).toBe(405)
    expect(await response1.json()).toEqual({ error: 'Method PUT not allowed' })

    const response2 = await fetch(url, {
      method: 'DELETE'
    })
    expect(response2.status).toBe(405)
    expect(await response2.json()).toEqual({
      error: 'Method DELETE not allowed'
    })

    const response3 = await fetch(url, {
      method: 'PATCH'
    })
    expect(response3.status).toBe(405)
    expect(await response3.json()).toEqual({
      error: 'Method PATCH not allowed'
    })

    const response4 = await fetch(url, {
      method: 'OPTIONS'
    })
    expect(response4.status).toBe(405)
    expect(await response4.json()).toEqual({
      error: 'Method OPTIONS not allowed'
    })

    const response5 = await fetch(url, {
      method: 'HEAD'
    })
    expect(response5.status).toBe(405)
  })
})
