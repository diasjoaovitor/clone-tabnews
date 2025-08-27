import database from '@/infra/database'
import { TCreateUserSchema } from '@/schemas/user'
import { TUser } from '@/types/user'

const findOneById = async (id: string): Promise<TUser | null> => {
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

const findOneByUsername = async (username: string): Promise<TUser | null> => {
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

const findOneByEmail = async (email: string): Promise<TUser | null> => {
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

const create = async (params: TCreateUserSchema): Promise<TUser> => {
  const { username, email, password } = params
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

const update = async (params: TUser): Promise<TUser> => {
  const { id, username, email, password } = params
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

const userRepository = {
  findOneById,
  findOneByUsername,
  findOneByEmail,
  create,
  update
}

export default userRepository
