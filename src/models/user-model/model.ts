import { NotFoundError, ValidationError } from '@/infra'
import { TFeature, TUser, userRepository } from '@/repositories'

import { passwordModel } from '../password-model'
import { defaultFeatures } from './default-features'
import {
  createUserSchema,
  TCreateUser,
  TUpdateUser,
  updateUserSchema
} from './schema'

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
    throw new ValidationError({
      message: 'O username informado já está sendo utilizado.',
      action: 'Utilize outro username para realizar esta operação.',
      statusCode: 409
    })
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
    throw new ValidationError({
      message: 'O email informado já está sendo utilizado.',
      action: 'Utilize outro email para realizar esta operação.',
      statusCode: 409
    })
  }
}

const create = async (data: TCreateUser): Promise<TUser> => {
  const validData = createUserSchema.parse(data)
  const { username, email, password } = validData

  await validateUniqueEmail({ email })
  await validateUniqueUsername({ username })

  const passwordHash = await passwordModel.hash(password)
  const user = await userRepository.create({
    username,
    email,
    password: passwordHash,
    features: defaultFeatures
  })

  return user
}

const findUniqueById = async (id: string): Promise<TUser> => {
  const user = await userRepository.findUniqueById(id)
  if (!user) {
    throw new NotFoundError({
      message: 'O id informado não foi encontrado no sistema.',
      action: 'Verifique se o id está digitado corretamente.'
    })
  }
  return user
}

const findUniqueByUsername = async (username: string): Promise<TUser> => {
  const user = await userRepository.findUniqueByUsername(username)
  if (!user) {
    throw new NotFoundError({
      message: 'O username informado não foi encontrado no sistema.',
      action: 'Verifique se o username está digitado corretamente.'
    })
  }
  return user
}

const findUniqueByEmail = async (email: string): Promise<TUser> => {
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
  data: TUpdateUser,
  currentUsername: string
): Promise<TUser> => {
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
    data.password = await passwordModel.hash(password)
  }

  const user = await userRepository.update(foundUserByUsername.id, {
    ...foundUserByUsername,
    ...data
  })

  return user
}

const setFeatures = async (
  id: string,
  features: TFeature[]
): Promise<TUser> => {
  const user = await userRepository.setFeatures(id, features)
  return user
}

const addFeatures = async (
  id: string,
  features: TFeature[]
): Promise<TUser> => {
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
