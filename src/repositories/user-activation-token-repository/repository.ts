import { database, DatabaseClient } from '@/infra/database'
import { DataInput } from '@/types/generics'

import { UserActivationToken } from './types'

const create = async (
  data: DataInput<Omit<UserActivationToken, 'used_at'>>,
  client?: DatabaseClient
): Promise<UserActivationToken> => {
  const result = await database.query<UserActivationToken>(
    `
      INSERT INTO
        user_activation_tokens (user_id, expires_at)
      VALUES
        ($1, $2)
      RETURNING
        *
    `,
    [data.user_id, data.expires_at],
    client
  )
  return database.getRequiredRow(result)
}

const findUniqueValidById = async (
  id: string
): Promise<UserActivationToken | null> => {
  const result = await database.query<UserActivationToken>(
    `
      SELECT
        *
      FROM
        user_activation_tokens
      WHERE
        id = $1
        AND expires_at > NOW()
        AND used_at IS NULL
      LIMIT
        1
    `,
    [id]
  )

  const [activationToken] = result.rows
  return activationToken ?? null
}

const markAsUsed = async (id: string): Promise<UserActivationToken> => {
  const result = await database.query<UserActivationToken>(
    `
      UPDATE
        user_activation_tokens
      SET
        used_at = now(),
        updated_at = now()
      WHERE
        id = $1
      RETURNING
        *
    `,
    [id]
  )

  return database.getRequiredRow(result)
}

export const userActivationTokenRepository = {
  create,
  findUniqueValidById,
  markAsUsed
}
