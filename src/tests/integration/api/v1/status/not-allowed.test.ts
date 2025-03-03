import { TErrorResponse } from '@/infra'
import orchestrator from '@/tests/orchestrator'

beforeAll(orchestrator.waitForAllServices)

describe('Not allowed methods to /api/v1/status', () => {
  test('should return 405 and the response error', async () => {
    const url = 'http://localhost:3000/api/v1/status'
    const notAllowedMethods = ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    const expectedData: TErrorResponse = {
      name: 'MethodNotAllowedError',
      message: 'Método não permitido para este endpoint.',
      action: 'Verifique se o método HTTP enviado é válido para este endpoint.',
      status_code: 405
    }
    for (const method of notAllowedMethods) {
      const response = await fetch(url, {
        method
      })
      expect(response.status).toBe(expectedData.status_code)
      expect(await response.json()).toEqual(expectedData)
    }
    const response = await fetch(url, {
      method: 'HEAD'
    })
    expect(response.status).toBe(expectedData.status_code)
  })
})
