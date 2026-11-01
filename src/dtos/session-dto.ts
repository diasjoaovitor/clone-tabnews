import { Session } from '@/repositories/session-repository/types'

export type SessionDto = Omit<Session, 'token'>

export const getSessionDto = (session: Session): SessionDto => {
  return {
    id: session.id,
    user_id: session.user_id,
    created_at: session.created_at,
    updated_at: session.updated_at,
    expires_at: session.expires_at
  }
}
