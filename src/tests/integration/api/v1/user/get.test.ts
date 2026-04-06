import setCookieParser, { Cookie } from 'set-cookie-parser'
import { version as uuidVersion } from 'uuid'

import { API_BASE_URL } from '@/constants'
import { TUserDto } from '@/dtos'
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

describe('GET /api/v1/user', () => {
  describe('Anonymous user', () => {
    test('Retrieving the endpoint', async () => {
      const response = await fetch(`${API_BASE_URL}/user`)
      expect(response.status).toBe(403)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'ForbiddenError',
        message: 'Você não possui permissão para executar esta ação.',
        action: 'Verifique se o seu usuário possui a feature "read:session"',
        status_code: 403
      }
      expect(responseBody).toEqual(expectedData)
    })
  })

  describe('Default user', () => {
    test('With valid session', async () => {
      const createdUser = await orchestrator.createUser({
        username: 'UserWithValidSession'
      })
      const activatedUser = await orchestrator.activateUser(createdUser.id)
      const sessionObject = await orchestrator.createSession(createdUser.id)

      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(200)

      const cacheControl = response.headers.get('Cache-Control')
      expect(cacheControl).toBe(
        'no-store, no-cache, max-age=0, must-revalidate'
      )

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: createdUser.id,
        username: 'UserWithValidSession',
        email: createdUser.email,
        features: ['create:session', 'read:session', 'update:user'],
        created_at: createdUser.created_at,
        updated_at: activatedUser.updated_at
      }
      expect(data).toEqual(expectedData)
      expect(uuidVersion(data.id)).toBe(4)

      // Session renewal assertions
      const renewedSessionObject = await sessionModel.findUniqueValidByToken(
        sessionObject.token
      )
      expect(
        renewedSessionObject.expires_at > sessionObject.expires_at
      ).toEqual(true)
      expect(
        renewedSessionObject.updated_at > sessionObject.updated_at
      ).toEqual(true)

      // Set-Cookie assertions
      const parsedSetCookie = setCookieParser(
        response.headers.get('Set-Cookie')!,
        {
          map: true
        }
      )
      const expectedParsedSetCookie: Cookie = {
        name: 'session_id',
        value: sessionObject.token,
        maxAge: sessionModel.EXPIRATION_IN_MILLISECONDS / 1000,
        path: '/',
        httpOnly: true,
        expires: expect.any(Date)
      }
      expect(parsedSetCookie.session_id).toEqual(expectedParsedSetCookie)
    })

    test('With halfway-expired session', async () => {
      jest.useFakeTimers({
        now: new Date(Date.now() - sessionModel.EXPIRATION_IN_MILLISECONDS / 2)
      })

      const createdUser = await orchestrator.createUser({
        username: 'UserWithHalfwayExpiredSession'
      })
      const activatedUser = await orchestrator.activateUser(createdUser.id)
      const sessionObject = await orchestrator.createSession(createdUser.id)

      jest.useRealTimers()

      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: {
          cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: createdUser.id,
        username: 'UserWithHalfwayExpiredSession',
        email: createdUser.email,
        features: ['create:session', 'read:session', 'update:user'],
        created_at: createdUser.created_at,
        updated_at: activatedUser.updated_at
      }
      expect(data).toEqual(expectedData)
      expect(uuidVersion(data.id)).toBe(4)

      // Session renewal assertions
      const renewedSessionObject = await sessionModel.findUniqueValidByToken(
        sessionObject.token
      )
      expect(
        renewedSessionObject.expires_at > sessionObject.expires_at
      ).toEqual(true)
      expect(
        renewedSessionObject.updated_at > sessionObject.updated_at
      ).toEqual(true)

      // Set‑Cookie assertions
      const parsedSetCookie = setCookieParser(
        response.headers.get('Set-Cookie')!,
        {
          map: true
        }
      )
      const expectedParsedSetCookie: Cookie = {
        name: 'session_id',
        value: sessionObject.token,
        maxAge: sessionModel.EXPIRATION_IN_MILLISECONDS / 1000,
        path: '/',
        httpOnly: true,
        expires: expect.any(Date)
      }
      expect(parsedSetCookie.session_id).toEqual(expectedParsedSetCookie)
    })

    test('With nonexistent session', async () => {
      const nonexistentToken =
        'f0b62a5ff97ae607701ceeee2e3c4987c4b9debb534410e2444f9eb2288b6e3b90158a71d086e31eabef9b36cbb549e1'

      const response = await fetch(`${API_BASE_URL}/user`, {
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

      // Set-Cookie assertions
      const parsedSetCookie = setCookieParser(
        response.headers.get('Set-Cookie')!,
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
    })

    test('With expired session', async () => {
      jest.useFakeTimers({
        now: new Date(Date.now() - sessionModel.EXPIRATION_IN_MILLISECONDS)
      })

      const createdUser = await orchestrator.createUser({
        username: 'UserWithExpiredSession'
      })
      const sessionObject = await orchestrator.createSession(createdUser.id)

      jest.useRealTimers()

      const response = await fetch(`${API_BASE_URL}/user`, {
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

      // Set-Cookie assertions
      const parsedSetCookie = setCookieParser(
        response.headers.get('Set-Cookie')!,
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
    })
  })
})
