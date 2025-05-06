import bcryptjs from 'bcryptjs'

const hash = async (password: string) => {
  const rounds = process.env.NODE_ENV === 'production' ? 14 : 1
  return await bcryptjs.hash(password, rounds)
}

const compare = async (providedPassword: string, storedPassword: string) =>
  await bcryptjs.compare(providedPassword, storedPassword)

export const password = {
  hash,
  compare
}
