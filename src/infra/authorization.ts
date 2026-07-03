import { TUserFeatures } from '@/constants'
import { authorizationModel } from '@/models'

import { ForbiddenError } from './errors'
import { TUserSession } from './session'

export const can = (
  user: TUserSession,
  feature: TUserFeatures | undefined
): void => {
  if (!feature) return
  if (authorizationModel.can(user, feature)) return
  throw new ForbiddenError({
    message: 'Você não possui permissão para executar esta ação.',
    action: `Verifique se o seu usuário possui a feature "${feature}"`
  })
}
