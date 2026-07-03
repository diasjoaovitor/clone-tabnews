import bcryptjs from 'bcryptjs'

import { BCRYPT_ROUNDS } from './constants'

const hash = async (password: string): Promise<string> => {
  const environment = process.env.NODE_ENV
  const hash =
    environment !== 'test'
      ? await bcryptjs.hash(password, BCRYPT_ROUNDS)
      : bcryptjs.hashSync(password, BCRYPT_ROUNDS)
  return hash
}

const compare = async (
  providedPassword: string,
  storedPassword: string
): Promise<boolean> => {
  return await bcryptjs.compare(providedPassword, storedPassword)
}

export const passwordModel = {
  hash,
  compare
}
