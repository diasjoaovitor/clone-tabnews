import setCookieParser, { Cookie } from 'set-cookie-parser'
import { version as uuidVersion } from 'uuid'

import { API_BASE_URL } from '@/constants'
import { TSessionDto } from '@/dtos'
import { TErrorResponse } from '@/infra'
import { sessionModel } from '@/models'
import orchestrator from '@/tests/orchestrator'
import { TApiResponse } from '@/types'
import { isoStringFieldsToDate } from '@/utils'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('DELETE /api/v1/sessions', () => {
  describe('Default user', () => {
    test('With nonexistent session', async () => {
      const nonexistentToken =
        'f0b62a5ff97ae607701ceeee2e3c4987c4b9debb534410e2444f9eb2288b6e3b90158a71d086e31eabef9b36cbb549e1'

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'DELETE',
        headers: {
          cookie: `session_id=${nonexistentToken}`
        }
      })
      expect(response.status).toBe(401)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'UnauthorizedError',
        message: 'Usuário não possui sessão ativa.',
        action: 'Verifique se este usuário está logado e tente novamente.',
        status_code: 401
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With expired session', async () => {
      jest.useFakeTimers({
        now: new Date(Date.now() - sessionModel.EXPIRATION_IN_MILLISECONDS)
      })

      const createdUser = await orchestrator.createUser()
      const sessionObject = await orchestrator.createSession(createdUser.id)

      jest.useRealTimers()

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'DELETE',
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(401)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'UnauthorizedError',
        message: 'Usuário não possui sessão ativa.',
        action: 'Verifique se este usuário está logado e tente novamente.',
        status_code: 401
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With valid session', async () => {
      const createdUser = await orchestrator.createUser()
      const sessionObject = await orchestrator.createSession(createdUser.id)

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'DELETE',
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TSessionDto> = await response.json()
      const data: TSessionDto = isoStringFieldsToDate(responseBody)
      const expectedData: TSessionDto = {
        id: expect.any(String),
        token: sessionObject.token,
        user_id: sessionObject.user_id,
        expires_at: expect.any(Date),
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      }

      expect(data).toEqual(expectedData)
      expect(uuidVersion(data.id)).toBe(4)

      expect(data.expires_at < sessionObject.expires_at).toBe(true)
      expect(data.updated_at > sessionObject.updated_at).toBe(true)

      // Set-Cookie assertions
      const parsedSetCookie = setCookieParser(
        response.headers.get('set-cookie')!,
        {
          map: true
        }
      )

      const expectedParsedSetCookie: Cookie = {
        name: 'session_id',
        value: 'invalid',
        maxAge: -1,
        path: '/',
        httpOnly: true,
        expires: expect.any(Date)
      }
      expect(parsedSetCookie.session_id).toEqual(expectedParsedSetCookie)

      // Double check assertions
      const doubleCheckResponse = await fetch(`${API_BASE_URL}/user`, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(doubleCheckResponse.status).toBe(401)

      const doubleCheckResponseBody = await doubleCheckResponse.json()
      const expectedDoubleCheckResponseBody: TErrorResponse = {
        name: 'UnauthorizedError',
        message: 'Usuário não possui sessão ativa.',
        action: 'Verifique se este usuário está logado e tente novamente.',
        status_code: 401
      }
      expect(doubleCheckResponseBody).toEqual(expectedDoubleCheckResponseBody)
    })
  })
})
