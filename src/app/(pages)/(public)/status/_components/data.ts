import { getStatusDto, StatusDto } from '@/dtos/status-dto'
import { gated } from '@/infra/gated'
import { statusModel } from '@/models/status-model/model'

export const getStatus = gated(async (user): Promise<StatusDto> => {
  const status = await statusModel.check()
  return getStatusDto(user, status)
})
