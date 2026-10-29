import { UserFeature } from '@/constants/features'

export type User = {
  id: string
  username: string
  email: string
  password: string
  features: UserFeature[]
  created_at: Date
  updated_at: Date
}
