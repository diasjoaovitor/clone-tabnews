import { database } from '@/infra'
import { TDataInput } from '@/types'

import { TSession } from './types'

const create = async (data: TDataInput<TSession>): Promise<TSession> => {
  const { expires_at, token, user_id } = data
  const {
    rows: [session]
  } = await database.query(
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
  return session
}

const findUniqueValidByToken = async (
  token: string
): Promise<TSession | null> => {
  const {
    rows: [session]
  } = await database.query(
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
  return session || null
}

const renew = async (id: string, expires_at: Date): Promise<TSession> => {
  const {
    rows: [session]
  } = await database.query(
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
  return session
}

const expires = async (id: string): Promise<TSession> => {
  const {
    rows: [session]
  } = await database.query(
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
  return session
}

export const sessionRepository = {
  create,
  findUniqueValidByToken,
  renew,
  expires
}
