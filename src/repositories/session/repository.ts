import { database } from '@/infra/database'
import { DataInput } from '@/types/generics'

import { Session } from './types'

const create = async (data: DataInput<Session>): Promise<Session> => {
  const { expires_at, token, user_id } = data
  const result = await database.query<Session>(
    `
        INSERT INTO
          sessions (token, user_id, expires_at)
        VALUES
          ($1, $2, $3)
        RETURNING
          *
      `,
    [token, user_id, expires_at]
  )
  return database.getRequiredRow(result)
}

const findUniqueValidByToken = async (
  token: string
): Promise<Session | null> => {
  const result = await database.query<Session>(
    `
        SELECT
          *
        FROM
          sessions
        WHERE
          token = $1
          AND expires_at > now()
        LIMIT
          1
      `,
    [token]
  )
  const [session] = result.rows
  return session ?? null
}

const renew = async (id: string, expires_at: Date): Promise<Session> => {
  const result = await database.query<Session>(
    `UPDATE
        sessions
      SET
        expires_at = $2,
        updated_at = now()
      WHERE
        id = $1
      RETURNING *`,
    [id, expires_at]
  )
  return database.getRequiredRow(result)
}

const expires = async (id: string): Promise<Session> => {
  const result = await database.query<Session>(
    `UPDATE
        sessions
      SET
        expires_at = expires_at - interval '1 year',
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

export const sessionRepository = {
  create,
  findUniqueValidByToken,
  renew,
  expires
}
