import { NextResponse } from 'next/server'

import { controller } from '@/infra'
import { statusModel } from '@/models'

const getHandler = async () => {
  const body = await statusModel.check()

  return NextResponse.json(body, {
    status: 200
  })
}

export const { GET, DELETE, HEAD, OPTIONS, PATCH, POST, PUT } =
  controller.handle({
    GET: getHandler
  })
