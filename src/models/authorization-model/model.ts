import { UserFeature } from '@/constants/features'
import { UserSession } from '@/infra/session'

const can = (
  user: UserSession,
  feature: UserFeature,
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
