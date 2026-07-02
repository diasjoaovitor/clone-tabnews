import { database } from '@/infra'
import { TDataInput } from '@/types'

import { TFeature } from './features'
import { TUser } from './types'

const create = async (data: TDataInput<TUser>): Promise<TUser> => {
  const { username, email, password, features } = data
  const {
    rows: [user]
  } = await database.query(
    `
        INSERT INTO
          users (username, email, password, features)
        VALUES
          ($1, $2, $3, $4)
        RETURNING *
      `,
    [username, email, password, features]
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

const update = async (id: string, data: TDataInput<TUser>): Promise<TUser> => {
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

const setFeatures = async (
  id: string,
  features: TFeature[]
): Promise<TUser> => {
  const {
    rows: [user]
  } = await database.query(
    `UPDATE
        users
      SET
        features = $1,
        updated_at = timezone('utc', now())
      WHERE
        id = $2
      RETURNING *`,
    [features, id]
  )
  return user
}

const addFeatures = async (
  id: string,
  features: TFeature[]
): Promise<TUser> => {
  const {
    rows: [user]
  } = await database.query(
    `
    UPDATE
         users
       SET
         features = array_cat(features, $1),
         updated_at = timezone('utc', now())
       WHERE
         id = $2
       RETURNING
         *
    `,
    [features, id]
  )
  return user
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
