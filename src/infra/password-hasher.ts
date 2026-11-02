import bcryptjs from 'bcryptjs'

export const BCRYPT_ROUNDS = process.env.NODE_ENV === 'production' ? 14 : 4

const hash = async (password: string): Promise<string> => {
  return await bcryptjs.hash(password, BCRYPT_ROUNDS)
}

const compare = async (
  providedPassword: string,
  storedPassword: string
): Promise<boolean> => {
  return await bcryptjs.compare(providedPassword, storedPassword)
}

export const passwordHasher = {
  hash,
  compare
}
