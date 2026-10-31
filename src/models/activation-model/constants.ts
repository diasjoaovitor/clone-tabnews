import { UserFeature } from '@/constants/features'

export const ACTIVATION_TOKEN_EXPIRATION_IN_MILLISECONDS = 60 * 15 * 1000 // 15 minutes

export const ACTIVATED_USER_FEATURES: UserFeature[] = [
  'create:session',
  'read:session',
  'update:user'
]
