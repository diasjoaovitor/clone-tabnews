import { UnauthorizedError } from '@/infra'
import { TUser } from '@/repositories'

import { findUserByEmail, validatePassword } from './utils'

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
