import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'

import { database } from '@/infra/database'
import { email } from '@/infra/email'
import { registrationModel } from '@/models/registration-model/model'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
  await orchestrator.deleteAllEmails()
})

afterEach(() => {
  vi.restoreAllMocks()
})

const countRows = async (table: 'users' | 'user_activation_tokens') => {
  const result = await database.query<{ count: number }>(
    `SELECT COUNT(*)::int AS count FROM ${table}`
  )
  return result.rows[0]?.count
}

describe('Use case: Registration when the activation email fails', () => {
  const userInput = {
    username: 'EmailFailure',
    email: 'email.failure@curso.dev',
    password: 'senha123'
  }

  test('Registration fails and leaves neither the user nor the activation token', async () => {
    vi.spyOn(email, 'send').mockRejectedValueOnce(new Error('SMTP is down'))

    await expect(registrationModel.register(userInput)).rejects.toThrow(
      'SMTP is down'
    )

    expect(await countRows('users')).toBe(0)
    expect(await countRows('user_activation_tokens')).toBe(0)
  })

  test('The same registration succeeds afterwards', async () => {
    const user = await registrationModel.register(userInput)

    expect(user.username).toBe('EmailFailure')
    expect(await countRows('users')).toBe(1)
    expect(await countRows('user_activation_tokens')).toBe(1)

    const lastEmail = await orchestrator.getLastEmail()
    expect(lastEmail.recipients[0]).toBe('email.failure@curso.dev')
  })
})
