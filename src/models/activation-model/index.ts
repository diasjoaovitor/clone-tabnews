import dedent from 'dedent'

import { email, ForbiddenError, NotFoundError, webserver } from '@/infra'
import { authorizationModel, userModel } from '@/models'
import {
  TUser,
  TUserActivationToken,
  userActivationTokenRepository
} from '@/repositories'

const EXPIRATION_IN_MILLISECONDS = 60 * 15 * 1000 // 15 minutes

const findUniqueValidById = async (
  id: string
): Promise<TUserActivationToken> => {
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

const create = async (userId: string): Promise<TUserActivationToken> => {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS)
  const result = await userActivationTokenRepository.create({
    expires_at: expiresAt,
    user_id: userId
  })
  return result
}

const markTokenAsUsed = async (id: string): Promise<TUserActivationToken> => {
  const result = await userActivationTokenRepository.markAsUsed(id)
  return result
}

const activateUserByUserId = async (id: string): Promise<TUser> => {
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

const sendEmailToUser = async (
  user: Pick<TUser, 'username' | 'email'>,
  activationTokenId: string
): Promise<void> => {
  await email.send({
    from: 'FinTab <contato@fintab.com.br>',
    to: user.email,
    subject: 'Ative seu cadastro no FinTab!',
    text: dedent`
      ${user.username}, clique no link abaixo para ativar seu cadastro no FinTab:

      ${webserver.origin}/cadastro/ativar/${activationTokenId}

      Atenciosamente,
      Equipe FinTab
    `
  })
}

export const activationModel = {
  findUniqueValidById,
  create,
  markTokenAsUsed,
  activateUserByUserId,
  sendEmailToUser,
  EXPIRATION_IN_MILLISECONDS
}
