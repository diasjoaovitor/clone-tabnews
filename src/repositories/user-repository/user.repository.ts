import { database } from '@/infra'
import { TDataInput } from '@/types'

import { TUser } from './types'

const create = async (data: TDataInput<TUser>): Promise<TUser> => {
  const { username, email, password } = data
  const {
    rows: [user]
  } = await database.query(
    `
        INSERT INTO
          users (username, email, password)
        VALUES
          ($1, $2, $3)
        RETURNING *
      `,
    [username, email, password]
  )
  return user
}

const findUniqueById = async (id: string): Promise<TUser | null> => {
  const {
    rows: [user]
  } = await database.query(
    `
        SELECT * FROM users WHERE id = $1
      `,
    [id]
  )
  return user || null
}

const findUniqueByUsername = async (
  username: string
): Promise<TUser | null> => {
  const {
    rows: [user]
  } = await database.query(
    `
        SELECT * FROM users WHERE LOWER(username) = LOWER($1)
      `,
    [username]
  )
  return user
}

const findUniqueByEmail = async (email: string): Promise<TUser | null> => {
  const {
    rows: [user]
  } = await database.query(
    `
        SELECT * FROM users WHERE LOWER(email) = LOWER($1)
      `,
    [email]
  )
  return user || null
}

const update = async (data: TDataInput<TUser>, id: string): Promise<TUser> => {
  const { username, email, password } = data
  const {
    rows: [user]
  } = await database.query(
    `UPDATE
        users
      SET
        username = $1,
        email = $2,
        password = $3,
        updated_at = timezone('utc', now())
      WHERE
        id = $4
      RETURNING *`,
    [username, email, password, id]
  )
  return user
}

export const userRepository = {
  create,
  findUniqueById,
  findUniqueByUsername,
  findUniqueByEmail,
  update
}
