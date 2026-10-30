import dedent from 'dedent'

import { email } from '@/infra/email'
import { ForbiddenError, NotFoundError } from '@/infra/errors'
import { webserver } from '@/infra/webserver'
import { ACTIVATION_TOKEN_EXPIRATION_IN_MILLISECONDS } from '@/models/activation-model/constants'
import { authorizationModel } from '@/models/authorization-model/model'
import { userModel } from '@/models/user-model/model'
import { userActivationTokenRepository } from '@/repositories/user-activation-token-repository/repository'
import { UserActivationToken } from '@/repositories/user-activation-token-repository/types'
import { User } from '@/repositories/user-repository/types'

import { activationTokenIdSchema } from './schema'

const findUniqueValidById = async (
  id: string
): Promise<UserActivationToken> => {
  activationTokenIdSchema.parse({ token_id: id })
  const result = await userActivationTokenRepository.findUniqueValidById(id)
  if (!result) {
    throw new NotFoundError({
      message:
        'O token de ativação utilizado não foi encontrado no sistema ou expirou.',
      action: 'Faça um novo cadastro.'
    })
  }
  return result
}

const create = async (userId: string): Promise<UserActivationToken> => {
  const expiresAt = new Date(
    Date.now() + ACTIVATION_TOKEN_EXPIRATION_IN_MILLISECONDS
  )
  const result = await userActivationTokenRepository.create({
    expires_at: expiresAt,
    user_id: userId
  })
  return result
}

const markTokenAsUsed = async (id: string): Promise<UserActivationToken> => {
  const result = await userActivationTokenRepository.markAsUsed(id)
  return result
}

const activateUserByUserId = async (id: string): Promise<User> => {
  const user = await userModel.findUniqueById(id)

  if (!authorizationModel.can(user, 'read:activation_token')) {
    throw new ForbiddenError({
      message: 'Você não pode mais utilizar tokens de ativação.',
      action: 'Entre em contato com o suporte.'
    })
  }

  const activatedUser = await userModel.setFeatures(id, [
    'create:session',
    'read:session',
    'update:user'
  ])
  return activatedUser
}

const activateUserByTokenId = async (
  tokenId: string
): Promise<UserActivationToken> => {
  const validActivationToken = await findUniqueValidById(tokenId)
  await activateUserByUserId(validActivationToken.user_id)
  const usedActivationToken = await markTokenAsUsed(tokenId)
  return usedActivationToken
}

const sendEmailToUser = async (
  user: Pick<User, 'username' | 'email'>,
  activationTokenId: string
): Promise<void> => {
  await email.send({
    from: 'Clone TabNews <contato@diasjoaovitor.com.br>',
    to: user.email,
    subject: 'Ative seu cadastro no Clone TabNews!',
    text: dedent`
      ${user.username}, clique no link abaixo para ativar seu cadastro no Clone TabNews:

      ${webserver.origin}/cadastro/ativar/${activationTokenId}

      Atenciosamente,
      Equipe Clone TabNews
    `
  })
}

export const activationModel = {
  findUniqueValidById,
  create,
  markTokenAsUsed,
  activateUserByUserId,
  activateUserByTokenId,
  sendEmailToUser
}
