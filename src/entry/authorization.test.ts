import { describe, expect, test } from 'vitest'

import { authorize } from '@/entry/authorization'
import { ForbiddenError, UnauthorizedError } from '@/infra/errors'

const anonymous = { features: [] }

describe('authorize', () => {
  test('lets a user with the feature through', () => {
    expect(() =>
      authorize({ user: { features: ['read:session'] } }, 'read:session')
    ).not.toThrow()
  })

  test('throws a ForbiddenError when the user lacks the feature', () => {
    expect(() => authorize({ user: anonymous }, 'read:session')).toThrow(
      ForbiddenError
    )
  })

  test('throws the session error when an invalid session lacks the feature', () => {
    const sessionError = new UnauthorizedError()
    expect(() =>
      authorize({ user: anonymous, sessionError }, 'read:session')
    ).toThrow(sessionError)
  })

  test('lets an invalid session through when the anonymous user has the feature', () => {
    expect(() =>
      authorize(
        {
          user: { features: ['create:session'] },
          sessionError: new UnauthorizedError()
        },
        'create:session'
      )
    ).not.toThrow()
  })
})
