import crypto from 'node:crypto'

import { UnauthorizedError } from '@/infra/errors'
import { sessionRepository } from '@/repositories/session-repository/repository'
import { Session } from '@/repositories/session-repository/types'

import { SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS } from './constants'
import { sessionTokenSchema } from './schema'

const create = async (userId: string): Promise<Session> => {
  const token = crypto.randomBytes(48).toString('hex')
  const expiresAt = new Date(
    Date.now() + SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS
  )

  const newSession = await sessionRepository.create({
    token,
    user_id: userId,
    expires_at: expiresAt
  })

  return newSession
}

const findUniqueValidByToken = async (token: string): Promise<Session> => {
  // A malformed cookie answers like an unknown session (401, not 400), so the cookie is cleared and
  // `gated()` falls back to the anonymous user
  const sessionFound = sessionTokenSchema.safeParse(token).success
    ? await sessionRepository.findUniqueValidByToken(token)
    : null

  if (!sessionFound) {
    throw new UnauthorizedError({
      message: 'Usuário não possui sessão ativa.',
      action: 'Verifique se este usuário está logado e tente novamente.'
    })
  }

  return sessionFound
}

const renew = async (id: string): Promise<Session> => {
  const expiresAt = new Date(
    Date.now() + SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS
  )
  const renewedSessionObject = await sessionRepository.renew(id, expiresAt)
  return renewedSessionObject
}

const expires = async (id: string): Promise<Session> => {
  const expiredSessionObject = await sessionRepository.expires(id)
  return expiredSessionObject
}

export const sessionModel = {
  create,
  findUniqueValidByToken,
  renew,
  expires
}
