import { UserFeature } from '@/constants/features'
import { ANONYMOUS_FEATURES } from '@/models/authorization-model/constants'

import { can } from './authorization'
import { UnauthorizedError } from './errors'
import { session, UserSession } from './session'

export const gated = <Params extends unknown[], T>(
  handler: (user: UserSession, ...params: Params) => Promise<T>,
  feature?: UserFeature
) => {
  return async (...params: Params): Promise<T> => {
    let user: UserSession
    try {
      user = await session.getUser()
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        user = { features: ANONYMOUS_FEATURES }
      } else {
        throw error
      }
    }
    can(user, feature)
    return handler(user, ...params)
  }
}
