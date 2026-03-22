import { API_BASE_URL } from '@/constants'
import { TStatusDto } from '@/dtos'
import orchestrator from '@/tests/orchestrator'
import { TApiResponse } from '@/types'
import { isoStringFieldsToDate } from '@/utils'

beforeAll(orchestrator.waitForAllServices)

describe('GET to /api/v1/status', () => {
  describe('Anonymous user', () => {
    test('Retrieving current system status', async () => {
      const response = await fetch(`${API_BASE_URL}/status`)
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TStatusDto> = await response.json()
      const data: TStatusDto = isoStringFieldsToDate(responseBody)
      const expectedData: TApiResponse<TStatusDto> = {
        updated_at: expect.any(Date),
        dependencies: {
          database: {
            max_connections: 100,
            opened_connections: 1
          }
        }
      }
      expect(data).toEqual(expectedData)
    })
  })

  describe('Privileged user', () => {
    test('Retrieving current system status', async () => {
      const privilegedUser = await orchestrator.createUser()
      const activatedPrivilegedUser = await orchestrator.activateUser(
        privilegedUser.id
      )
      await orchestrator.addFeaturesToUser(privilegedUser.id, [
        'read:status:all'
      ])
      const privilegedUserSession = await orchestrator.createSession(
        activatedPrivilegedUser.id
      )

      const response = await fetch(`${API_BASE_URL}/status`, {
        headers: {
          cookie: `session_id=${privilegedUserSession.token}`
        }
      })
      expect(response.status).toBe(200)

      const responseBody: TApiResponse<TStatusDto> = await response.json()
      const data: TStatusDto = isoStringFieldsToDate(responseBody)
      const expectedData: TApiResponse<TStatusDto> = {
        updated_at: expect.any(Date),
        dependencies: {
          database: {
            version: '16.0',
            max_connections: 100,
            opened_connections: 1
          }
        }
      }
      expect(data).toEqual(expectedData)
    })
  })
})
