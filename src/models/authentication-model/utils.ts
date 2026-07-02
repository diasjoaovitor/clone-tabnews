import { NotFoundError, UnauthorizedError } from '@/infra'
import { passwordModel, userModel } from '@/models'
import { TUser } from '@/repositories'

export const findUserByEmail = async (email: string): Promise<TUser> => {
  try {
    const user = await userModel.findUniqueByEmail(email)
    return user
  } catch (error) {
    if (error instanceof NotFoundError) {
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
