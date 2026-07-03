export const USER_FEATURES = [
  // USER
  'create:user',
  'update:user',
  'update:user:others',

  // SESSION
  'create:session',
  'read:session',

  // ACTIVATION_TOKEN
  'read:activation_token',

  // MIGRATION
  'create:migration',
  'read:migration',

  // STATUS
  'read:status:all'
] as const

export type TUserFeatures = (typeof USER_FEATURES)[number]
