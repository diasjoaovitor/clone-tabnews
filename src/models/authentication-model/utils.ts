import { NotFoundError, UnauthorizedError } from '@/infra/errors'
import { passwordModel } from '@/models/password-model/model'
import { userModel } from '@/models/user-model/model'
import { User } from '@/repositories/user-repository/types'

import { DUMMY_PASSWORD_HASH } from './constants'

export const compareToDummyPassword = async (
  password: string
): Promise<void> => {
  await passwordModel.compare(password, DUMMY_PASSWORD_HASH)
}

export const findUserByEmail = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const user = await userModel.findUniqueByEmail(email)
    return user
  } catch (error) {
    if (error instanceof NotFoundError) {
      await compareToDummyPassword(password)
      throw new UnauthorizedError({
        message: 'Email não confere.',
        action: 'Verifique se este dado está correto.'
      })
    }
    throw error
  }
}

export const validatePassword = async ({
  password,
  storedPassword
}: {
  password: string
  storedPassword: string
}): Promise<void> => {
  const correctPasswordMatch = await passwordModel.compare(
    password,
    storedPassword
  )
  if (!correctPasswordMatch) {
    throw new UnauthorizedError({
      message: 'Senha não confere.',
      action: 'Verifique se este dado está correto.'
    })
  }
}
