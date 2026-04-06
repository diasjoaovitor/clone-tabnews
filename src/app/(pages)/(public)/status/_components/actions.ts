import { getStatusDto, TStatusDto } from '@/dtos'
import { session } from '@/infra'
import { statusModel } from '@/models'

export const getStatus = async (): Promise<TStatusDto> => {
  const status = await statusModel.check()
  const user = await session.getUser()
  return getStatusDto(user, status)
}
