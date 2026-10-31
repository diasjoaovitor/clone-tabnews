import { beforeAll, describe, expect, test } from 'vitest'

import { API_BASE_URL } from '@/constants/base-url'
import { StatusDto } from '@/dtos/status-dto'
import { ApiResponse } from '@/tests/_types/generics'
import { isoStringFieldsToDate } from '@/tests/_utils/formatters'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('GET to /api/v1/status', () => {
  describe('Anonymous user', () => {
    test('Retrieving current system status', async () => {
      const response = await fetch(`${API_BASE_URL}/status`)
      expect(response.status).toBe(200)

      const responseBody: ApiResponse<StatusDto> = await response.json()
      const data: StatusDto = isoStringFieldsToDate(responseBody)
      const expectedData: ApiResponse<StatusDto> = {
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

  describe('Default user', () => {
    test('Retrieving current system status', async () => {
      const { sessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const response = await fetch(`${API_BASE_URL}/status`, {
        headers: {
          cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(200)

      const responseBody: ApiResponse<StatusDto> = await response.json()
      const data: StatusDto = isoStringFieldsToDate(responseBody)
      const expectedData: ApiResponse<StatusDto> = {
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
      const { sessionObject } =
        await orchestrator.createActivatedUserWithSession(undefined, [
          'read:status:all'
        ])

      const response = await fetch(`${API_BASE_URL}/status`, {
        headers: {
          cookie: `session_id=${sessionObject.token}`
        }
      })
      expect(response.status).toBe(200)

      const responseBody: ApiResponse<StatusDto> = await response.json()
      const data: StatusDto = isoStringFieldsToDate(responseBody)
      const expectedData: ApiResponse<StatusDto> = {
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
