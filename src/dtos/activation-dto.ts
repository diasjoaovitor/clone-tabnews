import { UserActivationToken } from '@/repositories/user-activation-token-repository/types'
import { DtoGetter } from '@/types/generics'

export type UserActivationTokenDto = UserActivationToken

export const getActivationDto: DtoGetter<
  UserActivationToken,
  UserActivationTokenDto
> = (_, activation) => {
  return {
    id: activation.id,
    user_id: activation.user_id,
    created_at: activation.created_at,
    updated_at: activation.updated_at,
    expires_at: activation.expires_at,
    used_at: activation.used_at
  }
}
