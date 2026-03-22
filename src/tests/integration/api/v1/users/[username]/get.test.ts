import { version as uuidVersion } from 'uuid'

import { API_BASE_URL } from '@/constants'
import { TUserDto } from '@/dtos'
import { TErrorResponse } from '@/infra'
import orchestrator from '@/tests/orchestrator'
import { TApiResponse } from '@/types'
import { isoStringFieldsToDate } from '@/utils'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('GET /api/v1/users/[username]', () => {
  describe('Anonymous user', () => {
    test('With exact case match', async () => {
      await orchestrator.createUser({
        username: 'MesmoCase'
      })

      const response = await fetch(`${API_BASE_URL}/users/MesmoCase`)
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: expect.any(String),
        username: 'MesmoCase',
        features: ['read:activation_token'],
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      }
      expect(data).toEqual(expectedData)
      expect(uuidVersion(data.id)).toBe(4)
    })

    test('With case mismatch', async () => {
      await orchestrator.createUser({
        username: 'CaseDiferente'
      })

      const response = await fetch(`${API_BASE_URL}/users/casediferente`)
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: expect.any(String),
        username: 'CaseDiferente',
        features: ['read:activation_token'],
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      }
      expect(data).toEqual(expectedData)
      expect(uuidVersion(data.id)).toBe(4)
    })

    test('With nonexistent username', async () => {
      const response = await fetch(`${API_BASE_URL}/users/UsuarioInexistente`)
      expect(response.status).toBe(404)

      const responseBody = await response.json()
      const expectedData: TErrorResponse = {
        name: 'NotFoundError',
        message: 'O username informado não foi encontrado no sistema.',
        action: 'Verifique se o username está digitado corretamente.',
        status_code: 404
      }
      expect(responseBody).toEqual(expectedData)
    })
  })

  describe('Default user', () => {
    test('With exact case match', async () => {
      const user = await orchestrator.createUser()
      const activatedUser = await orchestrator.activateUser(user.id)
      const session = await orchestrator.createSession(user.id)

      const response = await fetch(`${API_BASE_URL}/users/${user.username}`, {
        headers: {
          Cookie: `session_id=${session.token}`
        }
      })
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TUserDto> = await response.json()
      const data: TUserDto = isoStringFieldsToDate(responseBody)
      const expectedData: TUserDto = {
        id: user.id,
        username: user.username,
        email: user.email,
        features: ['create:session', 'read:session', 'update:user'],
        created_at: user.created_at,
        updated_at: activatedUser.updated_at
      }
      expect(data).toEqual(expectedData)
    })
  })
})
