import { NextResponse } from 'next/server'

import { getStatusDto } from '@/dtos/status-dto'
import { controller } from '@/infra/controller'
import { session } from '@/infra/session'
import { statusModel } from '@/models/status-model/model'

const getHandler = async () => {
  const status = await statusModel.check()
  const user = await session.getUser()
  return NextResponse.json(getStatusDto(user, status), {
    status: 200
  })
}

export const { GET, DELETE, HEAD, OPTIONS, PATCH, POST, PUT } = controller({
  GET: getHandler
})
