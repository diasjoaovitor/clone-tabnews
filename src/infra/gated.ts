import { UserFeature } from '@/constants/features'

import { authorize } from './authorization'
import { session, UserSession } from './session'

export const gated = <Params extends unknown[], T>(
  handler: (user: UserSession, ...params: Params) => Promise<T>,
  feature?: UserFeature
) => {
  return async (...params: Params): Promise<T> => {
    const resolvedSession = await session.resolve()
    authorize(resolvedSession, feature)
    return handler(resolvedSession.user, ...params)
  }
}
