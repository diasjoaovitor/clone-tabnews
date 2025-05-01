import { z } from 'zod'

import { NotFoundError, ValidationError } from '@/infra'
import { userRepository } from '@/repositories'
import {
  createUserSchema,
  TCreateUserSchema,
  TUpdateUserSchema,
  updateUserSchema
} from '@/schemas'
import { TUser } from '@/types'

import { password } from '.'

const { hash } = password

const validateUniqueUsername = async ({
  username,
  id
}: {
  username: string
  id?: string
}): Promise<void> => {
  const foundUserByUsername = await userRepository.findOneByUsername(username)
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
  const foundUserByEmail = await userRepository.findOneByEmail(email)
  if (foundUserByEmail && foundUserByEmail.id !== id) {
    throw new ValidationError({
      message: 'O email informado já está sendo utilizado.',
      action: 'Utilize outro email para realizar esta operação.',
      statusCode: 409
    })
  }
}

const findOneByUsername = async (username: string): Promise<TUser> => {
  const user = await userRepository.findOneByUsername(username)
  if (!user) {
    throw new NotFoundError({
      message: 'O username informado não foi encontrado no sistema.',
      action: 'Verifique se o username está digitado corretamente.'
    })
  }
  return user
}

const create = async (params: TCreateUserSchema): Promise<TUser> => {
  const { username, email, password } = params

  try {
    createUserSchema.parse(params)
  } catch (error) {
    throw new ValidationError({
      message: (error as z.ZodError).errors[0].message
    })
  }

  await validateUniqueEmail({ email })
  await validateUniqueUsername({ username })

  const user = await userRepository.create({
    username,
    email,
    password: await hash(password)
  })
  return user
}

const update = async (
  currentUsername: string,
  params: TUpdateUserSchema
): Promise<TUser> => {
  const { username, email, password } = params

  try {
    updateUserSchema.parse(params)
  } catch (error) {
    throw new ValidationError({
      message: (error as z.ZodError).errors[0].message
    })
  }

  const foundUserByUsername =
    await userRepository.findOneByUsername(currentUsername)
  if (!foundUserByUsername) {
    throw new NotFoundError({
      message: 'O username informado não foi encontrado no sistema.',
      action: 'Verifique se o username está digitado corretamente.'
    })
  }

  if (username && username !== foundUserByUsername.username) {
    await validateUniqueUsername({ username, id: foundUserByUsername.id })
  }
  if (email && email !== foundUserByUsername.email) {
    await validateUniqueEmail({ email, id: foundUserByUsername.id })
  }
  if (password) {
    params.password = await hash(password)
  }

  const user = await userRepository.update({
    ...foundUserByUsername,
    ...params
  })
  return user
}

export const user = {
  findOneByUsername,
  create,
  update
}
