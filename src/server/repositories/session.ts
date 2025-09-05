import database from '@/infra/database'
import { TSession } from '@/shared/types/session'

const findOneValidByToken = async (
  sessionToken: string
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
    [sessionToken]
  )
  return session || null
}

const create = async ({
  token,
  userId,
  expiresAt
}: {
  token: string
  userId: string
  expiresAt: Date
}): Promise<TSession> => {
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
    [token, userId, expiresAt]
  )
  return session
}

const renew = async ({
  sessionId,
  expiresAt
}: {
  sessionId: string
  expiresAt: Date
}): Promise<TSession> => {
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
    [sessionId, expiresAt]
  )
  return session
}

const expireById = async (sessionId: string): Promise<TSession> => {
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
    [sessionId]
  )
  return session
}

const userRepository = {
  findOneValidByToken,
  create,
  renew,
  expireById
}

export default userRepository
