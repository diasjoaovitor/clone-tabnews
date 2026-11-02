import { SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS } from './constants'

export const getSessionExpirationDate = (): Date =>
  new Date(Date.now() + SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS)
