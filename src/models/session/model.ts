import crypto from 'node:crypto'

import { UnauthorizedError } from '@/infra/errors'
import { sessionRepository } from '@/repositories/session/repository'
import { Session } from '@/repositories/session/types'

import { sessionTokenSchema } from './schema'
import { getSessionExpirationDate } from './utils'

const create = async (userId: string): Promise<Session> => {
  const token = crypto.randomBytes(48).toString('hex')

  const newSession = await sessionRepository.create({
    token,
    user_id: userId,
    expires_at: getSessionExpirationDate()
  })

  return newSession
}

const findUniqueValidByToken = async (token: string): Promise<Session> => {
  // A malformed cookie answers like an unknown session (401, not 400), so `session.resolve()` falls
  // back to the anonymous user instead of failing the request
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
  const renewedSessionObject = await sessionRepository.renew(
    id,
    getSessionExpirationDate()
  )
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
