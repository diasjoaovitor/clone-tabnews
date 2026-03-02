import crypto from 'node:crypto'

import { UnauthorizedError } from '@/infra'
import { sessionRepository, TSession } from '@/repositories'

const EXPIRATION_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1000 // 30 Days

const create = async (userId: string): Promise<TSession> => {
  const token = crypto.randomBytes(48).toString('hex')
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS)

  const newSession = await sessionRepository.create({
    token,
    user_id: userId,
    expires_at: expiresAt
  })

  return newSession
}

const findUniqueValidByToken = async (token: string): Promise<TSession> => {
  const sessionFound = await sessionRepository.findUniqueValidByToken(token)

  if (!sessionFound) {
    throw new UnauthorizedError({
      message: 'Usuário não possui sessão ativa.',
      action: 'Verifique se este usuário está logado e tente novamente.'
    })
  }

  return sessionFound
}

const renew = async (id: string): Promise<TSession> => {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS)
  const renewedSessionObject = await sessionRepository.renew(id, expiresAt)
  return renewedSessionObject
}

const expires = async (id: string): Promise<TSession> => {
  const expiredSessionObject = await sessionRepository.expires(id)
  return expiredSessionObject
}

export const sessionModel = {
  EXPIRATION_IN_MILLISECONDS,
  create,
  findUniqueValidByToken,
  renew,
  expires
}
