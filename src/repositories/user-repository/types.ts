import { TFeature } from './features'

export type TUser = {
  id: string
  username: string
  email: string
  password: string
  features: TFeature[]
  created_at: Date
  updated_at: Date
}
