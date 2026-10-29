import { TUserFeatures } from '@/constants'
import { TUserSession } from '@/infra'

const can = (
  user: TUserSession,
  feature: TUserFeatures,
  resource?: { id: string }
): boolean => {
  let authorized = Boolean(user?.features.includes(feature))

  if (authorized && feature === 'update:user' && resource) {
    const isOwner = user?.id === resource.id
    authorized = isOwner || can(user, 'update:user:others')
  }

  return authorized
}

export const authorizationModel = {
  can
}
