import { beforeAll, describe, expect, test } from 'vitest'

import { database, DatabaseClient } from '@/infra/database'
import orchestrator from '@/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

const insertUser = async (username: string, client: DatabaseClient) => {
  await database.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
    [username, `${username}@curso.dev`, 'senha123'],
    client
  )
}

const countUsers = async (username: string) => {
  const { count } = database.getRequiredRow(
    await database.query<{ count: number }>(
      'SELECT count(*)::int FROM users WHERE username = $1',
      [username]
    )
  )
  return count
}

describe('infra/database.ts', () => {
  describe('transaction()', () => {
    test('Commits the queries when the callback resolves', async () => {
      const result = await database.transaction(async (client) => {
        await insertUser('commitado', client)
        return 'resultado'
      })

      expect(result).toBe('resultado')
      expect(await countUsers('commitado')).toBe(1)
    })

    test('Rolls back the queries when the callback throws', async () => {
      const error = new Error('falhou')

      await expect(
        database.transaction(async (client) => {
          await insertUser('revertido', client)
          throw error
        })
      ).rejects.toBe(error)

      expect(await countUsers('revertido')).toBe(0)
    })
  })
})
