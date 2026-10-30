import { activationModel } from '@/models/activation-model/model'
import { userModel } from '@/models/user-model/model'
import type { CreateUserInput } from '@/models/user-model/schema'
import { User } from '@/repositories/user-repository/types'

import { type RegistrationInput, registrationSchema } from './schema'

const register = async (data: CreateUserInput): Promise<User> => {
  const user = await userModel.create(data)

  const activationToken = await activationModel.create(user.id)
  await activationModel.sendEmailToUser(user, activationToken.id)

  return user
}

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
