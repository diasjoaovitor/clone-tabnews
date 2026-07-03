import { TUserFeatures } from '@/constants'

export type TUser = {
  id: string
  username: string
  email: string
  password: string
  features: TUserFeatures[]
  created_at: Date
  updated_at: Date
}
