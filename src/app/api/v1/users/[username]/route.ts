import { NextRequest, NextResponse } from 'next/server'

import { controller } from '@/infra'
import { userModel } from '@/models'

const getHandler = async (_: NextRequest, context: any) => {
  const params = await context.params
  const username = params.username
  const userFound = await userModel.findUniqueByUsername(username)
  return NextResponse.json(userFound)
}

const patchHandler = async (request: NextRequest, context: any) => {
  const params = await context.params
  const username = params.username
  const userInputValues = await request.json()
  const updatedUser = await userModel.update(userInputValues, username)
  return NextResponse.json(updatedUser, { status: 200 })
}

export const { GET, PATCH, DELETE, HEAD, OPTIONS, POST, PUT } =
  controller.handle({
    GET: getHandler,
    PATCH: patchHandler
  })
