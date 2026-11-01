import bcryptjs from 'bcryptjs'

import { BCRYPT_ROUNDS } from './constants'

const hash = async (password: string): Promise<string> => {
  return await bcryptjs.hash(password, BCRYPT_ROUNDS)
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
