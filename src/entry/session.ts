import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'

import { UnauthorizedError } from '@/infra/errors'
import { ANONYMOUS_FEATURES } from '@/models/authorization-model/constants'
import { UserSession } from '@/models/authorization-model/types'
import { SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS } from '@/models/session-model/constants'
import { sessionModel } from '@/models/session-model/model'
import { userModel } from '@/models/user-model/model'

// A browser only removes a cookie set with the same `path`, so `clear()` must share these with `save()`
const SESSION_COOKIE_OPTIONS = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'lax'
} as const

const save = async (token: string): Promise<void> => {
  const store = await cookies()
  store.set('session_id', token, {
    ...SESSION_COOKIE_OPTIONS,
    maxAge: SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS / 1000
  })
}

const clear = async (): Promise<void> => {
  const store = await cookies()
  store.set('session_id', 'invalid', { ...SESSION_COOKIE_OPTIONS, maxAge: -1 })
}

export type ResolvedSession = {
  user: UserSession
  // Returned instead of clearing the cookie here, since Server Components can't set cookies
  sessionError?: UnauthorizedError
}

const resolve = cache(async (): Promise<ResolvedSession> => {
  const store = await cookies()
  const token = store.get('session_id')?.value
  if (!token) return { user: { features: ANONYMOUS_FEATURES } }
  try {
    const session = await sessionModel.findUniqueValidByToken(token)
    const user = await userModel.findUniqueById(session.user_id)
    return {
      user: { id: user.id, sessionId: session.id, features: user.features }
    }
  } catch (error) {
    if (!(error instanceof UnauthorizedError)) throw error
    return { user: { features: ANONYMOUS_FEATURES }, sessionError: error }
  }
})

// Only Route Handlers and Server Actions can call it, since Server Components can't set cookies
const resolveAndClearInvalid = async (): Promise<ResolvedSession> => {
  const resolvedSession = await resolve()
  // Cleared before the handler runs, so a new session saved by the handler (sign-in) still wins
  if (resolvedSession.sessionError) await clear()
  return resolvedSession
}

const getUser = async (): Promise<UserSession> => {
  const { user } = await resolve()
  return user
}

export const session = {
  save,
  clear,
  resolve,
  resolveAndClearInvalid,
  getUser
}
