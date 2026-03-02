import { NotFoundError, UnauthorizedError } from '@/infra'
import { passwordModel, userModel } from '@/models'
import { TUser } from '@/repositories'

const findUserByEmail = async (email: string): Promise<TUser> => {
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

const validatePassword = async ({
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

const getAuthenticatedUser = async ({
  email,
  password
}: {
  email: string
  password: string
}): Promise<TUser> => {
  try {
    const user = await findUserByEmail(email)
    await validatePassword({ password, storedPassword: user.password })
    return user
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError({
        message: 'Dados de autenticação não conferem.',
        action: 'Verifique se os dados enviados estão corretos.'
      })
    }
    throw error
  }
}

export const authenticationModel = {
  getAuthenticatedUser
}
