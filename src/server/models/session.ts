import crypto from 'node:crypto'

import { UnauthorizedError } from '@/infra/errors'
import sessionRepository from '@/server/repositories/session'

const EXPIRATION_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1000 // 30 Days

const findOneValidByToken = async (sessionToken: string) => {
  const sessionFound = await sessionRepository.findOneValidByToken(sessionToken)

  if (!sessionFound) {
    throw new UnauthorizedError({
      message: 'Usuário não possui sessão ativa.',
      action: 'Verifique se este usuário está logado e tente novamente.'
    })
  }
  return sessionFound
}

const create = async (userId: string) => {
  const token = crypto.randomBytes(48).toString('hex')
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS)

  const newSession = await sessionRepository.create({
    token,
    userId,
    expiresAt
  })

  return newSession
}

const renew = async (sessionId: string) => {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS)

  const renewedSessionObject = await sessionRepository.renew({
    sessionId,
    expiresAt
  })

  return renewedSessionObject
}

const expireById = async (sessionId: string) => {
  const expiredSessionObject = await sessionRepository.expireById(sessionId)
  return expiredSessionObject
}

const session = {
  create,
  findOneValidByToken,
  renew,
  expireById,
  EXPIRATION_IN_MILLISECONDS
}

export default session
