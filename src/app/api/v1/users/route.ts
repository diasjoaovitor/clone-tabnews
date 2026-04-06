import { NextRequest, NextResponse } from 'next/server'

import { getUserDto } from '@/dtos'
import { controller } from '@/infra'
import { activationModel, userModel } from '@/models'

const postHandler = async (request: NextRequest) => {
  const userInputValues = await request.json()

  const newUser = await userModel.create(userInputValues)

  const activationToken = await activationModel.create(newUser.id)
  await activationModel.sendEmailToUser(newUser, activationToken.id)

  return NextResponse.json(getUserDto(newUser, newUser), { status: 201 })
}

export const { POST, DELETE, GET, HEAD, OPTIONS, PATCH, PUT } = controller({
  POST: { handler: postHandler, feature: 'create:user' }
})
