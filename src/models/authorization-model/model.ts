import { TUserFeatures } from '@/constants'
import { TUserSession } from '@/infra'

const can = (
  user: TUserSession,
  feature: TUserFeatures,
  resource?: { id: string }
): boolean => {
  let authorized = false

  if (user?.features.includes(feature)) {
    authorized = true
  }

  if (feature === 'update:user' && resource) {
    authorized = false

    const isOwner = user?.id === resource.id

    if (isOwner || can(user, 'update:user:others')) {
      authorized = true
    }
  }

  return authorized
}

export const authorizationModel = {
  can
}
