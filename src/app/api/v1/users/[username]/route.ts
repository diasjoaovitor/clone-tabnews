import { NextRequest, NextResponse } from 'next/server'

import { getUserDto } from '@/dtos/user-dto'
import { controller } from '@/entry/controller'
import { readJsonBody } from '@/entry/request'
import { session } from '@/entry/session'
import { ForbiddenError } from '@/infra/errors'
import { authorizationModel } from '@/models/authorization-model/model'
import { userModel } from '@/models/user-model/model'

type Context = RouteContext<'/api/v1/users/[username]'>

const getHandler = async (_: NextRequest, context: Context) => {
  const { username } = await context.params
  const userFound = await userModel.findUniqueByUsername(username)
  const sessionUser = await session.getUser()
  return NextResponse.json(getUserDto(sessionUser, userFound))
}

const patchHandler = async (request: NextRequest, context: Context) => {
  const params = await context.params
  const username = params.username
  const sessionUser = await session.getUser()
  const targetUser = await userModel.findUniqueByUsername(username)

  if (!authorizationModel.can(sessionUser, 'update:user', targetUser)) {
    throw new ForbiddenError({
      message: 'Você não possui permissão para atualizar outro usuário.',
      action:
        'Verifique se você possui a feature necessária para atualizar outro usuário.'
    })
  }

  const userInputValues = await readJsonBody(request)
  const updatedUser = await userModel.update(userInputValues, username)

  return NextResponse.json(getUserDto(sessionUser, updatedUser), {
    status: 200
  })
}

export const { GET, POST, PUT, PATCH, DELETE, OPTIONS } = controller({
  GET: getHandler,
  PATCH: { handler: patchHandler, feature: 'update:user' }
})
