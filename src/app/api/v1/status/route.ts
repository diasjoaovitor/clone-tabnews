import { NextResponse } from 'next/server'

import { getStatusDto } from '@/dtos'
import { controller, session } from '@/infra'
import { statusModel } from '@/models'

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
