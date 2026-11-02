import { beforeAll, describe, expect, test } from 'vitest'

import { API_BASE_URL } from '@/constants/base-url'
import { ErrorResponse } from '@/infra/errors'
import orchestrator from '@/tests/orchestrator'

const crossOriginError: ErrorResponse = {
  name: 'ForbiddenError',
  message:
    'Requisições autenticadas por cookie não podem ser feitas a partir de outra origem.',
  action: 'Faça a requisição a partir da mesma origem da API.',
  status_code: 403
}

beforeAll(async () => {
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('Origin check on unsafe and safe methods', () => {
  describe('Unsafe method', () => {
    test("With 'Sec-Fetch-Site: cross-site'", async () => {
      const { createdUser, sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser.username}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Sec-Fetch-Site': 'cross-site',
            Cookie: `session_id=${sessionObject.token}`
          },
          body: JSON.stringify({ username: 'forjadoSecFetch' })
        }
      )
      expect(response.status).toBe(403)
      expect(await response.json()).toEqual(crossOriginError)
    })

    test("With 'Sec-Fetch-Site: same-origin' and another 'Origin'", async () => {
      const { createdUser, sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser.username}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Sec-Fetch-Site': 'same-origin',
            Origin: 'https://outro-site.com',
            Cookie: `session_id=${sessionObject.token}`
          },
          body: JSON.stringify({ username: 'mesmaOrigem' })
        }
      )
      expect(response.status).toBe(200)
    })

    test("With an 'Origin' from another host", async () => {
      const { createdUser, sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(
        `${API_BASE_URL}/users/${createdUser.username}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Origin: 'https://outro-site.com',
            Cookie: `session_id=${sessionObject.token}`
          },
          body: JSON.stringify({ username: 'forjadoOrigin' })
        }
      )
      expect(response.status).toBe(403)
      expect(await response.json()).toEqual(crossOriginError)
    })

    test("With a malformed 'Origin'", async () => {
      const { sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'DELETE',
        headers: {
          Origin: 'null',
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(403)
      expect(await response.json()).toEqual(crossOriginError)
    })

    test("With the same host in 'Origin'", async () => {
      const { sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'DELETE',
        headers: {
          Origin: new URL(API_BASE_URL).origin,
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(200)
    })

    test("Without 'Origin', as a client outside a browser", async () => {
      const { sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'DELETE',
        headers: {
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(200)
    })

    test("With an invalid session cookie and 'Sec-Fetch-Site: cross-site'", async () => {
      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'DELETE',
        headers: {
          'Sec-Fetch-Site': 'cross-site',
          Cookie: 'session_id=invalid'
        }
      })
      expect(response.status).toBe(403)
      expect(response.headers.get('set-cookie')).toBeNull()
    })

    test('Without a session cookie', async () => {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Sec-Fetch-Site': 'cross-site'
        },
        body: JSON.stringify({
          username: 'semCookie',
          email: 'sem.cookie@curso.dev',
          password: 'senha123'
        })
      })
      expect(response.status).toBe(201)
    })
  })

  describe('Safe method', () => {
    test("With 'Sec-Fetch-Site: cross-site'", async () => {
      const { sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: {
          'Sec-Fetch-Site': 'cross-site',
          Cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(200)
    })
  })
})

describe("'Content-Type' check on requests with a session cookie", () => {
  test("With 'Content-Type: text/plain'", async () => {
    const { createdUser, sessionObject } =
      await orchestrator.createActivatedUserWithSession()

    const response = await fetch(
      `${API_BASE_URL}/users/${createdUser.username}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'text/plain',
          Cookie: `session_id=${sessionObject.token}`
        },
        body: JSON.stringify({ username: 'textoPuro' })
      }
    )
    expect(response.status).toBe(415)

    const expectedData: ErrorResponse = {
      name: 'UnsupportedMediaTypeError',
      message: 'O "Content-Type" enviado não é suportado.',
      action:
        'Envie os dados no formato JSON com o header "Content-Type: application/json".',
      status_code: 415
    }
    expect(await response.json()).toEqual(expectedData)
  })

  test("With 'Content-Type: application/json; charset=utf-8'", async () => {
    const { createdUser, sessionObject } =
      await orchestrator.createActivatedUserWithSession()

    const response = await fetch(
      `${API_BASE_URL}/users/${createdUser.username}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Cookie: `session_id=${sessionObject.token}`
        },
        body: JSON.stringify({ username: 'comCharset' })
      }
    )
    expect(response.status).toBe(200)
  })
})
