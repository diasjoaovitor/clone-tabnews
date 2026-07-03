import { getStatusDto, TStatusDto } from '@/dtos'
import { action } from '@/infra'
import { statusModel } from '@/models'

export const getStatus = action(async (user): Promise<TStatusDto> => {
  const status = await statusModel.check()
  return getStatusDto(user, status)
})
