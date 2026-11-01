import { UserFeature } from '@/constants/features'
import { database } from '@/infra/database'
import { DataInput } from '@/types/generics'

import { User } from './types'

const create = async (data: DataInput<User>): Promise<User> => {
  const { username, email, password, features } = data
  const result = await database.query<User>(
    `
        INSERT INTO
          users (username, email, password, features)
        VALUES
          ($1, $2, $3, $4)
        RETURNING *
      `,
    [username, email, password, features]
  )
  return database.getRequiredRow(result)
}

const findUniqueById = async (id: string): Promise<User | null> => {
  const result = await database.query<User>(
    `
        SELECT * FROM users WHERE id = $1
      `,
    [id]
  )
  const [user] = result.rows
  return user ?? null
}

const findUniqueByUsername = async (username: string): Promise<User | null> => {
  const result = await database.query<User>(
    `
        SELECT * FROM users WHERE LOWER(username) = LOWER($1)
      `,
    [username]
  )
  const [user] = result.rows
  return user ?? null
}

const findUniqueByEmail = async (email: string): Promise<User | null> => {
  const result = await database.query<User>(
    `
      SELECT * FROM users WHERE LOWER(email) = LOWER($1)
    `,
    [email]
  )
  const [user] = result.rows
  return user ?? null
}

const update = async (id: string, data: DataInput<User>): Promise<User> => {
  const { username, email, password } = data
  const result = await database.query<User>(
    `UPDATE
        users
      SET
        username = $1,
        email = $2,
        password = $3,
        updated_at = now()
      WHERE
        id = $4
      RETURNING *`,
    [username, email, password, id]
  )
  return database.getRequiredRow(result)
}

const setFeatures = async (
  id: string,
  features: UserFeature[]
): Promise<User> => {
  const result = await database.query<User>(
    `UPDATE
        users
      SET
        features = $1,
        updated_at = now()
      WHERE
        id = $2
      RETURNING *`,
    [features, id]
  )
  return database.getRequiredRow(result)
}

const addFeatures = async (
  id: string,
  features: UserFeature[]
): Promise<User> => {
  const result = await database.query<User>(
    `
    UPDATE
         users
       SET
         features = array_cat(features, $1),
         updated_at = now()
       WHERE
         id = $2
       RETURNING
         *
    `,
    [features, id]
  )
  return database.getRequiredRow(result)
}

export const userRepository = {
  create,
  findUniqueById,
  findUniqueByUsername,
  findUniqueByEmail,
  update,
  setFeatures,
  addFeatures
}
