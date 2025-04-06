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
      action: 'Utilize outro username para realizar o cadastro.',
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
      action: 'Utilize outro email para realizar o cadastro.',
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

  const user = await userRepository.create({ username, email, password })
  return user
}

const update = async (params: TUpdateUserSchema): Promise<TUser> => {
  const { id, username, email, password } = params

  try {
    updateUserSchema.parse(params)
  } catch (error) {
    throw new ValidationError({
      message: (error as z.ZodError).errors[0].message
    })
  }

  const foundUserById = await userRepository.findOneById(id)
  if (!foundUserById) {
    if (!foundUserById) {
      throw new NotFoundError({
        message: 'Usuário não encontrado.',
        action: 'Verifique o id informado e tente novamente.'
      })
    }
  }

  if (username !== foundUserById.username) {
    await validateUniqueUsername({ username, id })
  }
  if (email !== foundUserById.email) {
    await validateUniqueEmail({ email, id })
  }

  const user = await userRepository.update({ id, username, email, password })
  return user
}

export const user = {
  findOneByUsername,
  create,
  update
}
