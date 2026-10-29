import bcryptjs from 'bcryptjs'

import { BCRYPT_ROUNDS } from '@/models/password-model/constants'

export const DUMMY_PASSWORD_HASH = bcryptjs.hashSync(
  'dummy-password-for-timing-safety',
  BCRYPT_ROUNDS
)
