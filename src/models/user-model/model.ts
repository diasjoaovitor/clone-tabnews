import { UserFeature } from '@/constants/features'
import { NotFoundError } from '@/infra/errors'
import { passwordModel } from '@/models/password-model/model'
import { userRepository } from '@/repositories/user-repository/repository'
import { User } from '@/repositories/user-repository/types'

import { DEFAULT_USER_FEATURES } from './constants'
import {
  CreateUserInput,
  createUserSchema,
  UpdateUserInput,
  updateUserSchema
} from './schema'
import {
  createDuplicatedEmailError,
  createDuplicatedUsernameError,
  mapUniqueViolationError
} from './utils'

const validateUniqueUsername = async ({
  username,
  id
}: {
  username: string
  id?: string
}): Promise<void> => {
  const foundUserByUsername =
    await userRepository.findUniqueByUsername(username)
  if (foundUserByUsername && foundUserByUsername.id !== id) {
    throw createDuplicatedUsernameError()
  }
}

const validateUniqueEmail = async ({
  email,
  id
}: {
  email: string
  id?: string
}): Promise<void> => {
  const foundUserByEmail = await userRepository.findUniqueByEmail(email)
  if (foundUserByEmail && foundUserByEmail.id !== id) {
    throw createDuplicatedEmailError()
  }
}

const create = async (data: CreateUserInput): Promise<User> => {
  const validData = createUserSchema.parse(data)
  const { username, email, password } = validData

  await validateUniqueEmail({ email })
  await validateUniqueUsername({ username })

  const passwordHash = await passwordModel.hash(password)
  try {
    const user = await userRepository.create({
      username,
      email,
      password: passwordHash,
      features: DEFAULT_USER_FEATURES
    })
    return user
  } catch (error) {
    throw mapUniqueViolationError(error)
  }
}

const findUniqueById = async (id: string): Promise<User> => {
  const user = await userRepository.findUniqueById(id)
  if (!user) {
    throw new NotFoundError({
      message: 'O id informado não foi encontrado no sistema.',
      action: 'Verifique se o id está digitado corretamente.'
    })
  }
  return user
}

const findUniqueByUsername = async (username: string): Promise<User> => {
  const user = await userRepository.findUniqueByUsername(username)
  if (!user) {
    throw new NotFoundError({
      message: 'O username informado não foi encontrado no sistema.',
      action: 'Verifique se o username está digitado corretamente.'
    })
  }
  return user
}

const findUniqueByEmail = async (email: string): Promise<User> => {
  const user = await userRepository.findUniqueByEmail(email)
  if (!user) {
    throw new NotFoundError({
      message: 'O email informado não foi encontrado no sistema.',
      action: 'Verifique se o email está digitado corretamente.'
    })
  }
  return user
}

const update = async (
  data: UpdateUserInput,
  currentUsername: string
): Promise<User> => {
  const validData = updateUserSchema.parse(data)
  const { username, email, password } = validData

  const foundUserByUsername =
    await userRepository.findUniqueByUsername(currentUsername)
  if (!foundUserByUsername) {
    throw new NotFoundError({
      message: 'O username informado não foi encontrado no sistema.',
      action: 'Verifique se o username está digitado corretamente.'
    })
  }

  if (username && username !== foundUserByUsername.username) {
    await validateUniqueUsername({
      username,
      id: foundUserByUsername.id
    })
  }
  if (email && email !== foundUserByUsername.email) {
    await validateUniqueEmail({ email, id: foundUserByUsername.id })
  }
  if (password) {
    validData.password = await passwordModel.hash(password)
  }

  try {
    const user = await userRepository.update(foundUserByUsername.id, {
      ...foundUserByUsername,
      ...validData
    })
    return user
  } catch (error) {
    throw mapUniqueViolationError(error)
  }
}

const setFeatures = async (
  id: string,
  features: UserFeature[]
): Promise<User> => {
  const user = await userRepository.setFeatures(id, features)
  return user
}

const addFeatures = async (
  id: string,
  features: UserFeature[]
): Promise<User> => {
  const user = await userRepository.addFeatures(id, features)
  return user
}

export const userModel = {
  create,
  findUniqueById,
  findUniqueByUsername,
  findUniqueByEmail,
  update,
  setFeatures,
  addFeatures
}
