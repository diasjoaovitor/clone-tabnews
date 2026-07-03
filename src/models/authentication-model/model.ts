import { UnauthorizedError } from '@/infra'
import { TUser } from '@/repositories'

import { credentialsSchema, TCredentials } from './schema'
import { findUserByEmail, validatePassword } from './utils'

const getAuthenticatedUser = async (data: TCredentials): Promise<TUser> => {
  const { email, password } = credentialsSchema.parse(data)
  try {
    const user = await findUserByEmail(email, password)
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
