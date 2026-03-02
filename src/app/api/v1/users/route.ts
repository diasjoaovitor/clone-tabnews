import { NextRequest, NextResponse } from 'next/server'

import { controller } from '@/infra'
import { userModel } from '@/models'

const postHandler = async (request: NextRequest) => {
  const userInputValues = await request.json()
  const newUser = await userModel.create(userInputValues)
  return NextResponse.json(newUser, { status: 201 })
}

export const { POST, DELETE, GET, HEAD, OPTIONS, PATCH, PUT } =
  controller.handle({
    POST: postHandler
  })
