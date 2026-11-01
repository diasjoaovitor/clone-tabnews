import { UserFeature } from '@/constants/features'

export type UserSession = {
  features: UserFeature[]
  id?: string
  sessionId?: string
}
