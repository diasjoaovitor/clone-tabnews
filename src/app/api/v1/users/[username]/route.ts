import { NextRequest, NextResponse } from 'next/server'

import { controller } from '@/infra'
import { user } from '@/models'

const getHandler = async (_: NextRequest, context: any) => {
  const params = await context.params
  const username = params.username
  const userFound = await user.findOneByUsername(username)
  return NextResponse.json(userFound)
}

const putHandler = async (request: NextRequest) => {
  const userInputValues = await request.json()
  const updatedUser = await user.update(userInputValues)
  return NextResponse.json(updatedUser, { status: 200 })
}

export const { GET, PUT, DELETE, HEAD, OPTIONS, PATCH, POST } = controller({
  GET: getHandler,
  PUT: putHandler
})
