import bcryptjs from 'bcryptjs'

const hash = async (password: string): Promise<string> => {
  const environment = process.env.NODE_ENV
  const rounds = environment === 'production' ? 14 : 1
  const hash =
    environment !== 'test'
      ? await bcryptjs.hash(password, rounds)
      : bcryptjs.hashSync(password, rounds)
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
