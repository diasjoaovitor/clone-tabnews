import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'

import { authorizationModel, sessionModel, userModel } from '@/models'
import { TFeature } from '@/repositories'

const save = async (token: string): Promise<void> => {
  const expiresAt = sessionModel.EXPIRATION_IN_MILLISECONDS / 1000
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
    httpOnly: true
  })
}

export type TUserSession = {
  features: TFeature[]
  id?: string
}

const getUser = cache(async (): Promise<TUserSession> => {
  const features = authorizationModel.getAnonymousFeatures()
  const token = (await cookies()).get('session_id')?.value
  if (!token) return { features }
  const session = await sessionModel.findUniqueValidByToken(token)
  if (!session) return { features }
  const user = await userModel.findUniqueById(session.user_id)
  return {
    id: user.id,
    features: user.features
  }
})

export const session = {
  save,
  clear,
  getUser
}
