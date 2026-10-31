import { describe, expect, test } from 'vitest'

import { ACTIVATED_USER_FEATURES } from './constants'

describe('ACTIVATED_USER_FEATURES', () => {
  test('grants only the features of an activated user', () => {
    expect(ACTIVATED_USER_FEATURES).toEqual([
      'create:session',
      'read:session',
      'update:user'
    ])
  })
})
