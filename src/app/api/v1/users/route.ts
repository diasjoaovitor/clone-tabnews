import { NextRequest, NextResponse } from 'next/server'

import controller from '@/infra/controller'
import user from '@/models/user'

const postHandler = async (request: NextRequest) => {
  const userInputValues = await request.json()
  const newUser = await user.create(userInputValues)
  return NextResponse.json(newUser, { status: 201 })
}

export const { POST, DELETE, GET, HEAD, OPTIONS, PATCH, PUT } = controller({
  POST: postHandler
})
