import { TUserFeatures } from '@/constants'
import { ANONYMOUS_FEATURES } from '@/models'

import { can } from './authorization'
import { UnauthorizedError } from './errors'
import { session, TUserSession } from './session'

export const action = <Args extends unknown[], T>(
  handler: (user: TUserSession, ...args: Args) => Promise<T>,
  feature?: TUserFeatures
) => {
  return async (...args: Args): Promise<T> => {
    let user: TUserSession
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
    return handler(user, ...args)
  }
}
