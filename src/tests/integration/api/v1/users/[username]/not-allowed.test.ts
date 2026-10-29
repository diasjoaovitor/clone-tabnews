import { HTTP_METHODS } from 'next/dist/server/web/http'
import { describe, expect, test } from 'vitest'

import { API_BASE_URL } from '@/constants'
import { TErrorResponse } from '@/infra'

describe('Not allowed methods to /api/v1/users/[username]', () => {
  test('should return 405 and the response error', async () => {
    const url = `${API_BASE_URL}/users/username`
    const notAllowedMethods = HTTP_METHODS.filter(
      (method) => method !== 'GET' && method !== 'PATCH'
    )
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
      if (method === 'HEAD') continue
      expect(await response.json()).toEqual(expectedData)
    }
  })
})
