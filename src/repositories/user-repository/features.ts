export const features = [
  // USER
  'create:user',
  'read:user',
  'read:user:self',
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
  'read:status',
  'read:status:all'
] as const

export type TFeature = (typeof features)[number]
