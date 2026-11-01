import { ForbiddenError, UnauthorizedError } from '@/infra/errors'
import { authorizationModel } from '@/models/authorization-model/model'
import { sessionModel } from '@/models/session-model/model'
import { Session } from '@/repositories/session-repository/types'
import { User } from '@/repositories/user-repository/types'

import { CredentialsInput, credentialsSchema } from './schema'
import { findUserByEmail, validatePassword } from './utils'

const getAuthenticatedUser = async (data: CredentialsInput): Promise<User> => {
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

const signIn = async (data: CredentialsInput): Promise<Session> => {
  const user = await getAuthenticatedUser(data)
  if (!authorizationModel.can(user, 'create:session')) {
    throw new ForbiddenError({
      message: 'Você não possui permissão para fazer login.',
      action: 'Contate o suporte caso você acredite que isto seja um erro.'
    })
  }
  return await sessionModel.create(user.id)
}

export const authenticationModel = {
  getAuthenticatedUser,
  signIn
}
