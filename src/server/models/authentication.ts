import { NotFoundError, UnauthorizedError } from '@/infra/errors'
import password from '@/server/models/password'
import user from '@/server/models/user'
import { TUser } from '@/shared/types/user'

const { compare } = password

const findUserByEmail = async (email: string) => {
  let storedUser: TUser

  try {
    storedUser = await user.findOneByEmail(email)
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new UnauthorizedError({
        message: 'Email não confere.',
        action: 'Verifique se este dado está correto.'
      })
    }

    throw error
  }

  return storedUser
}

const validatePassword = async ({
  password,
  storedPassword
}: {
  password: string
  storedPassword: string
}) => {
  const correctPasswordMatch = await compare(password, storedPassword)
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
}) => {
  try {
    const storedUser = await findUserByEmail(email)

    await validatePassword({ password, storedPassword: storedUser.password })

    return storedUser
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

const authentication = {
  getAuthenticatedUser
}

export default authentication
