import { NextRequest, NextResponse } from 'next/server'

import { getUserDto } from '@/dtos/user-dto'
import { controller } from '@/infra/controller'
import { readJsonBody } from '@/infra/request'
import { activationModel } from '@/models/activation-model/model'
import { userModel } from '@/models/user-model/model'

const postHandler = async (request: NextRequest) => {
  const userInputValues = await readJsonBody(request)

  const newUser = await userModel.create(userInputValues)

  const activationToken = await activationModel.create(newUser.id)
  await activationModel.sendEmailToUser(newUser, activationToken.id)

  return NextResponse.json(getUserDto(newUser, newUser), { status: 201 })
}

export const { POST, DELETE, GET, HEAD, OPTIONS, PATCH, PUT } = controller({
  POST: { handler: postHandler, feature: 'create:user' }
})
