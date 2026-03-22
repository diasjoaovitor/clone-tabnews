export type TUserActivationToken = {
  id: string
  used_at: Date | null
  user_id: string
  expires_at: Date
  created_at: Date
  updated_at: Date
}
