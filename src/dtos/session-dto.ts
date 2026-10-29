import { ForbiddenError, InternalServerError } from '@/infra/errors'
import { Session } from '@/repositories/session-repository/types'
import { DtoGetter } from '@/types/generics'

export type SessionDto = Omit<Session, 'token'>

export const getSessionDto: DtoGetter<Session, SessionDto> = (
  user,
  session
) => {
  if (!user) {
    throw new InternalServerError({
      cause:
        'É necessário fornecer um usuário (anônimo ou autenticado) em "getSessionDto".'
    })
  }

  if (user.id !== session.user_id) {
    throw new ForbiddenError({
      message: 'Você não possui permissão para acessar esta sessão.',
      action: 'Contate o suporte caso você acredite que isto seja um erro.'
    })
  }

  return {
    id: session.id,
    user_id: session.user_id,
    created_at: session.created_at,
    updated_at: session.updated_at,
    expires_at: session.expires_at
  }
}
