import { database } from '@/infra/database'
import { DataInput } from '@/types/generics'

import { Session } from './types'

const create = async (data: DataInput<Session>): Promise<Session> => {
  const { expires_at, token, user_id } = data
  const { rows } = await database.query(
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
  const [session] = rows
  return session
}

const findUniqueValidByToken = async (
  token: string
): Promise<Session | null> => {
  const { rows } = await database.query(
    `
        SELECT
          *
        FROM
          sessions
        WHERE
          token = $1
          AND expires_at > timezone('utc', now())
        LIMIT
          1
      `,
    [token]
  )
  const [session] = rows
  return session || null
}

const renew = async (id: string, expires_at: Date): Promise<Session> => {
  const { rows } = await database.query(
    `UPDATE
        sessions
      SET
        expires_at = $2,
        updated_at = timezone('utc', now())
      WHERE
        id = $1
      RETURNING *`,
    [id, expires_at]
  )
  const [session] = rows
  return session
}

const expires = async (id: string): Promise<Session> => {
  const { rows } = await database.query(
    `UPDATE
        sessions
      SET
        expires_at = expires_at - interval '1 year',
        updated_at = timezone('utc', now())
      WHERE
        id = $1
      RETURNING
        *
      `,
    [id]
  )
  const [session] = rows
  return session
}

export const sessionRepository = {
  create,
  findUniqueValidByToken,
  renew,
  expires
}
