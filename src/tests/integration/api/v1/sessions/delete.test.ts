import setCookieParser, { Cookie } from 'set-cookie-parser'
import { version as uuidVersion } from 'uuid'
import { beforeAll, describe, expect, test, vi } from 'vitest'

import { API_BASE_URL } from '@/constants/base-url'
import { SessionDto } from '@/dtos/session-dto'
import { ErrorResponse } from '@/infra/errors'
import { SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS } from '@/models/session-model/constants'
import { ApiResponse } from '@/tests/_types/generics'
import { isoStringFieldsToDate } from '@/tests/_utils/formatters'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
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
      const expectedData: ErrorResponse = {
        name: 'UnauthorizedError',
        message: 'Usuário não possui sessão ativa.',
        action: 'Verifique se este usuário está logado e tente novamente.',
        status_code: 401
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With expired session', async () => {
      vi.setSystemTime(
        new Date(Date.now() - SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS)
      )

      const createdUser = await orchestrator.createUser()
      const sessionObject = await orchestrator.createSession(createdUser.id)

      vi.useRealTimers()

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'DELETE',
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(401)

      const responseBody = await response.json()
      const expectedData: ErrorResponse = {
        name: 'UnauthorizedError',
        message: 'Usuário não possui sessão ativa.',
        action: 'Verifique se este usuário está logado e tente novamente.',
        status_code: 401
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With valid session', async () => {
      const { sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'DELETE',
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(200)

      const responseBody: ApiResponse<SessionDto> = await response.json()
      const data: SessionDto = isoStringFieldsToDate(responseBody)
      const expectedData: SessionDto = {
        id: expect.any(String),
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
        sameSite: 'lax',
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
      const expectedDoubleCheckResponseBody: ErrorResponse = {
        name: 'UnauthorizedError',
        message: 'Usuário não possui sessão ativa.',
        action: 'Verifique se este usuário está logado e tente novamente.',
        status_code: 401
      }
      expect(doubleCheckResponseBody).toEqual(expectedDoubleCheckResponseBody)
    })
  })
})
