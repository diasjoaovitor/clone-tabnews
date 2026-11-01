import { BCRYPT_ROUNDS } from '@/models/password-model/constants'

// Precomputed so importing the model doesn't block the event loop on a
// 14-round hash at every cold start (#75).
export const DUMMY_PASSWORD_HASH =
  BCRYPT_ROUNDS === 14
    ? '$2b$14$8iVQfXyY18Tb0V/xM1M.Q.LagRbsU7NWxO/rI1fhs5H6vKIN0T3Ba'
    : '$2b$04$Fqid2fceDbHP5.G7obCf1eyAHwi3Y0ocNf37dWKs64QzTNo7lmTpO'
