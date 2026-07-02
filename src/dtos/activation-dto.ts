import { TUserActivationToken } from '@/repositories'
import { TGetDto } from '@/types'

export type TUserActivationTokenDto = TUserActivationToken

export const getActivationDto: TGetDto<
  TUserActivationToken,
  TUserActivationTokenDto
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
