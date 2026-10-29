import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'

import { UserFeature } from '@/constants/features'
import { ANONYMOUS_FEATURES } from '@/models/authorization-model/constants'
import { SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS } from '@/models/session-model/constants'
import { sessionModel } from '@/models/session-model/model'
import { userModel } from '@/models/user-model/model'

const save = async (token: string): Promise<void> => {
  const expiresAt = SESSION_TOKEN_EXPIRATION_IN_MILLISECONDS / 1000
  const store = await cookies()
  store.set('session_id', token, {
    path: '/',
    maxAge: expiresAt,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  })
}

const clear = async (): Promise<void> => {
  const store = await cookies()
  store.set('session_id', 'invalid', {
    path: '/',
    maxAge: -1,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  })
}

export type UserSession = {
  features: UserFeature[]
  id?: string
  sessionId?: string
}

const getUser = cache(async (): Promise<UserSession> => {
  const store = await cookies()
  const token = store.get('session_id')?.value
  if (!token) return { features: ANONYMOUS_FEATURES }
  const session = await sessionModel.findUniqueValidByToken(token)
  const user = await userModel.findUniqueById(session.user_id)
  return {
    id: user.id,
    sessionId: session.id,
    features: user.features
  }
})

export const session = {
  save,
  clear,
  getUser
}
