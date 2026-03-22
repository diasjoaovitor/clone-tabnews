import { ForbiddenError, InternalServerError } from '@/infra'
import { TSession } from '@/repositories'
import { TGetDto } from '@/types'

export type TSessionDto = TSession

export const getSessionDto: TGetDto<TSession, TSessionDto> = (
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
    token: session.token,
    user_id: session.user_id,
    created_at: session.created_at,
    updated_at: session.updated_at,
    expires_at: session.expires_at
  }
}
