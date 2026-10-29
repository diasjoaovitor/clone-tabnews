import { UserFeature } from '@/constants/features'
import { authorizationModel } from '@/models/authorization-model/model'

import { ForbiddenError } from './errors'
import { UserSession } from './session'

export const can = (
  user: UserSession,
  feature: UserFeature | undefined
): void => {
  if (!feature) return
  if (authorizationModel.can(user, feature)) return
  throw new ForbiddenError({
    message: 'Você não possui permissão para executar esta ação.',
    action: `Verifique se o seu usuário possui a feature "${feature}"`
  })
}
