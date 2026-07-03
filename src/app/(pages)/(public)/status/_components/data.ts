import { getStatusDto, TStatusDto } from '@/dtos'
import { gated } from '@/infra'
import { statusModel } from '@/models'

export const getStatus = gated(async (user): Promise<TStatusDto> => {
  const status = await statusModel.check()
  return getStatusDto(user, status)
})
