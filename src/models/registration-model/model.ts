import { database } from '@/infra/database'
import { activationModel } from '@/models/activation-model/model'
import { userModel } from '@/models/user-model/model'
import type { CreateUserInput } from '@/models/user-model/schema'
import { User } from '@/repositories/user-repository/types'

import { type RegistrationInput, registrationSchema } from './schema'

// The email is sent inside the transaction, so a failed send rolls back the user and the token
// instead of leaving an account that can never be activated (#79)
const register = async (data: CreateUserInput): Promise<User> =>
  database.transaction(async (client) => {
    const user = await userModel.create(data, client)

    const activationToken = await activationModel.create(user.id, client)
    await activationModel.sendEmailToUser(user, activationToken.id)

    return user
  })

const registerWithConfirmation = async (
  data: RegistrationInput
): Promise<User> => {
  const { username, email, password } = registrationSchema.parse(data)
  return register({ username, email, password })
}

export const registrationModel = {
  register,
  registerWithConfirmation
}
