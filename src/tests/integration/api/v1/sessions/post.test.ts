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

describe('POST /api/v1/sessions', () => {
  describe('Anonymous user', () => {
    test('With incorrect `email` but correct `password`', async () => {
      await orchestrator.createUser({
        password: 'senha-correta'
      })

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'POST',
        body: JSON.stringify({
          email: 'email.errado@curso.dev',
          password: 'senha-correta'
        })
      })
      expect(response.status).toBe(401)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'UnauthorizedError',
        message: 'Dados de autenticação não conferem.',
        action: 'Verifique se os dados enviados estão corretos.',
        status_code: 401
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With correct `email` but incorrect `password`', async () => {
      await orchestrator.createUser({
        email: 'email.correto@curso.dev'
      })

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'POST',
        body: JSON.stringify({
          email: 'email.correto@curso.dev',
          password: 'senha-incorreta'
        })
      })
      expect(response.status).toBe(401)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'UnauthorizedError',
        message: 'Dados de autenticação não conferem.',
        action: 'Verifique se os dados enviados estão corretos.',
        status_code: 401
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With incorrect `email` and incorrect `password`', async () => {
      await orchestrator.createUser()

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'POST',
        body: JSON.stringify({
          email: 'email.incorreto@curso.dev',
          password: 'senha-incorreta'
        })
      })
      expect(response.status).toBe(401)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'UnauthorizedError',
        message: 'Dados de autenticação não conferem.',
        action: 'Verifique se os dados enviados estão corretos.',
        status_code: 401
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With correct `email` and correct `password`', async () => {
      const createdUser = await orchestrator.createUser({
        email: 'tudo.correto@curso.dev',
        password: 'tudocorreto'
      })
      await orchestrator.activateUser(createdUser.id)

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'POST',
        body: JSON.stringify({
          email: 'tudo.correto@curso.dev',
          password: 'tudocorreto'
        })
      })
      expect(response.status).toBe(201)

      const responseBody: TApiResponse<TSessionDto> = await response.json()
      const data: TSessionDto = isoStringFieldsToDate(responseBody)
      const expectedData: TApiResponse<TSessionDto> = {
        id: expect.any(String),
        token: expect.any(String),
        user_id: createdUser.id,
        expires_at: expect.any(Date),
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      }
      expect(data).toEqual(expectedData)
      expect(uuidVersion(data.id)).toBe(4)

      data.expires_at.setMilliseconds(0)
      data.created_at.setMilliseconds(0)

      expect(data.expires_at.getTime() - data.created_at.getTime()).toBe(
        sessionModel.EXPIRATION_IN_MILLISECONDS
      )

      const parsedSetCookie = setCookieParser(
        response.headers.get('set-cookie')!,
        {
          map: true
        }
      )
      const expectedParsedSetCookie: Cookie = {
        name: 'session_id',
        value: data.token,
        maxAge: sessionModel.EXPIRATION_IN_MILLISECONDS / 1000,
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
        expires: expect.any(Date)
      }
      expect(parsedSetCookie.session_id).toEqual(expectedParsedSetCookie)
    })
  })
})
