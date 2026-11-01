import bcryptjs from 'bcryptjs'
import { describe, expect, test } from 'vitest'

import { BCRYPT_ROUNDS } from '@/models/password-model/constants'

import { DUMMY_PASSWORD_HASH } from './constants'

describe('DUMMY_PASSWORD_HASH', () => {
  test('has the same cost as the stored passwords', () => {
    expect(bcryptjs.getRounds(DUMMY_PASSWORD_HASH)).toBe(BCRYPT_ROUNDS)
  })
})
