import { describe, expect, test } from 'vitest'

import { API_BASE_URL } from '@/constants/base-url'
import { HTTP_METHODS, HttpMethod } from '@/entry/controller'
import { ErrorResponse } from '@/infra/errors'

describe('Not allowed methods to /api/v1/status', () => {
  test('should return 405, the allowed methods and the response error', async () => {
    const url = `${API_BASE_URL}/status`
    const allowedMethods = new Set<HttpMethod>(['GET'])
    const notAllowedMethods = HTTP_METHODS.filter(
      (method) => !allowedMethods.has(method)
    )
    const expectedData: ErrorResponse = {
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
      expect(response.headers.get('Allow')).toBe('GET, HEAD, OPTIONS')
      expect(await response.json()).toEqual(expectedData)
    }
  })
})
