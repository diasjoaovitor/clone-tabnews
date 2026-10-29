import { version as uuidVersion } from 'uuid'
import { beforeAll, describe, expect, test, vi } from 'vitest'

import { API_BASE_URL } from '@/constants/base-url'
import { UserActivationTokenDto } from '@/dtos/activation-dto'
import { ErrorResponse } from '@/infra/errors'
import { ACTIVATION_TOKEN_EXPIRATION_IN_MILLISECONDS } from '@/models/activation-model/constants'
import { activationModel } from '@/models/activation-model/model'
import { userModel } from '@/models/user-model/model'
import { UserActivationToken } from '@/repositories/user-activation-token-repository/types'
import { ApiResponse } from '@/tests/_types/generics'
import { isoStringFieldsToDate } from '@/tests/_utils/formatters'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe('PATCH /api/v1/activations/[token-id]', () => {
  describe('Anonymous user', () => {
    test('With nonexistent token', async () => {
      const response = await fetch(
        `${API_BASE_URL}/activations/256bc49a-132a-42e4-8334-998fd17ee71e`,
        {
          method: 'PATCH'
        }
      )
      expect(response.status).toBe(404)

      const responseBody = await response.json()
      const expectedData: ErrorResponse = {
        name: 'NotFoundError',
        message:
          'O token de ativação utilizado não foi encontrado no sistema ou expirou.',
        action: 'Faça um novo cadastro.',
        status_code: 404
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With malformed token', async () => {
      const response = await fetch(`${API_BASE_URL}/activations/not-a-uuid`, {
        method: 'PATCH'
      })
      expect(response.status).toBe(400)

      const responseBody = await response.json()
      const expectedData: ErrorResponse = {
        name: 'ValidationError',
        message: 'O token de ativação informado não é válido.',
        action: 'Ajuste os dados enviados e tente novamente.',
        status_code: 400,
        fields: {
          token_id: 'O token de ativação informado não é válido.'
        }
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With expired token', async () => {
      vi.setSystemTime(
        new Date(Date.now() - ACTIVATION_TOKEN_EXPIRATION_IN_MILLISECONDS)
      )

      const createdUser = await orchestrator.createUser()
      const expiredActivationToken = await activationModel.create(
        createdUser.id
      )

      vi.useRealTimers()

      const response = await fetch(
        `${API_BASE_URL}/activations/${expiredActivationToken.id}`,
        {
          method: 'PATCH'
        }
      )
      expect(response.status).toBe(404)

      const responseBody = await response.json()
      const expectedData: ErrorResponse = {
        name: 'NotFoundError',
        message:
          'O token de ativação utilizado não foi encontrado no sistema ou expirou.',
        action: 'Faça um novo cadastro.',
        status_code: 404
      }
      expect(responseBody).toEqual(expectedData)
    })

    test('With already used token', async () => {
      const createdUser = await orchestrator.createUser()
      const activationToken = await activationModel.create(createdUser.id)

      const response1 = await fetch(
        `${API_BASE_URL}/activations/${activationToken.id}`,
        {
          method: 'PATCH'
        }
      )
      expect(response1.status).toBe(200)

      const response2 = await fetch(
        `${API_BASE_URL}/activations/${activationToken.id}`,
        {
          method: 'PATCH'
        }
      )
      expect(response2.status).toBe(404)

      const response2Body = await response2.json()
      const expectedData: ErrorResponse = {
        name: 'NotFoundError',
        message:
          'O token de ativação utilizado não foi encontrado no sistema ou expirou.',
        action: 'Faça um novo cadastro.',
        status_code: 404
      }
      expect(response2Body).toEqual(expectedData)
    })

    test('With valid token', async () => {
      const createdUser = await orchestrator.createUser()
      const activationToken = await activationModel.create(createdUser.id)

      const response = await fetch(
        `${API_BASE_URL}/activations/${activationToken.id}`,
        {
          method: 'PATCH'
        }
      )
      expect(response.status).toBe(200)

      const responseBody: ApiResponse<UserActivationTokenDto> =
        await response.json()
      const data: UserActivationToken = isoStringFieldsToDate(responseBody)
      const expectedData: UserActivationTokenDto = {
        id: activationToken.id,
        used_at: data.used_at,
        user_id: createdUser.id,
        expires_at: activationToken.expires_at,
        created_at: activationToken.created_at,
        updated_at: data.updated_at
      }
      expect(data).toEqual(expectedData)

      expect(uuidVersion(data.id)).toBe(4)
      expect(uuidVersion(data.user_id)).toBe(4)

      expect(data.updated_at > data.created_at).toBe(true)

      data.expires_at.setMilliseconds(0)
      data.created_at.setMilliseconds(0)

      expect(data.expires_at.getTime() - data.created_at.getTime()).toBe(
        ACTIVATION_TOKEN_EXPIRATION_IN_MILLISECONDS
      )

      const activatedUser = await userModel.findUniqueById(data.user_id)
      expect(activatedUser.features).toEqual([
        'create:session',
        'read:session',
        'update:user'
      ])
    })

    test('With valid token but already activated user', async () => {
      const createdUser = await orchestrator.createUser()
      await orchestrator.activateUser(createdUser.id)
      const activationToken = await activationModel.create(createdUser.id)

      const response = await fetch(
        `${API_BASE_URL}/activations/${activationToken.id}`,
        {
          method: 'PATCH'
        }
      )
      expect(response.status).toBe(403)

      const responseBody = await response.json()
      const expectedData: ErrorResponse = {
        name: 'ForbiddenError',
        message: 'Você não pode mais utilizar tokens de ativação.',
        action: 'Entre em contato com o suporte.',
        status_code: 403
      }
      expect(responseBody).toEqual(expectedData)
    })
  })

  describe('Default user', () => {
    test('With valid token, but already logged in user', async () => {
      const { sessionObject: user1SessionObject } =
        await orchestrator.createActivatedUserWithSession()

      const user2 = await orchestrator.createUser()
      const user2ActivationToken = await activationModel.create(user2.id)

      const response = await fetch(
        `${API_BASE_URL}/activations/${user2ActivationToken.id}`,
        {
          method: 'PATCH',
          headers: {
            Cookie: `session_id=${user1SessionObject.token}`
          }
        }
      )

      expect(response.status).toBe(403)

      const responseBody = await response.json()
      const expectedData: ErrorResponse = {
        name: 'ForbiddenError',
        message: 'Você não possui permissão para executar esta ação.',
        action:
          'Verifique se o seu usuário possui a feature "read:activation_token"',
        status_code: 403
      }
      expect(responseBody).toEqual(expectedData)
    })
  })
})
