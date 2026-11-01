import { UserFeature } from '@/constants/features'
import { ForbiddenError } from '@/infra/errors'
import { authorizationModel } from '@/models/authorization-model/model'

import type { ResolvedSession } from './session'

export const authorize = (
  { user, sessionError }: ResolvedSession,
  feature: UserFeature | undefined
): void => {
  if (!feature || authorizationModel.can(user, feature)) return
  // An invalid cookie means the user may have lost the session, so they're asked to sign in again
  // instead of being told they lack the permission
  if (sessionError) throw sessionError
  throw new ForbiddenError({
    message: 'Você não possui permissão para executar esta ação.',
    action: `Verifique se o seu usuário possui a feature "${feature}"`
  })
}
