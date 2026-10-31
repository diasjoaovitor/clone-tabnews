import { database } from '@/infra/database'
import { DataInput } from '@/types/generics'

import { UserActivationToken } from './types'

const create = async (
  data: DataInput<Omit<UserActivationToken, 'used_at'>>
): Promise<UserActivationToken> => {
  const results = await database.query(
    `
      INSERT INTO
        user_activation_tokens (user_id, expires_at)
      VALUES
        ($1, $2)
      RETURNING
        *
    `,
    [data.user_id, data.expires_at]
  )
  return results.rows[0]
}

const findUniqueValidById = async (
  id: string
): Promise<UserActivationToken> => {
  const results = await database.query(
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

  return results.rows[0] || null
}

const markAsUsed = async (id: string): Promise<UserActivationToken> => {
  const results = await database.query(
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

  return results.rows[0]
}

export const userActivationTokenRepository = {
  create,
  findUniqueValidById,
  markAsUsed
}
