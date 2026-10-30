import { NextRequest, NextResponse } from 'next/server'

import { getUserDto } from '@/dtos/user-dto'
import { controller } from '@/infra/controller'
import { readJsonBody } from '@/infra/request'
import { registrationModel } from '@/models/registration-model/model'

const postHandler = async (request: NextRequest) => {
  const userInputValues = await readJsonBody(request)

  const newUser = await registrationModel.register(userInputValues)

  return NextResponse.json(getUserDto(newUser, newUser), { status: 201 })
}

export const { POST, DELETE, GET, HEAD, OPTIONS, PATCH, PUT } = controller({
  POST: { handler: postHandler, feature: 'create:user' }
})
