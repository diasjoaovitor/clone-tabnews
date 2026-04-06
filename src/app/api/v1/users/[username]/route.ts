import { NextRequest, NextResponse } from 'next/server'

import { getUserDto } from '@/dtos'
import { controller, ForbiddenError, session } from '@/infra'
import { authorizationModel, userModel } from '@/models'

type TContext = RouteContext<'/api/v1/users/[username]'>

const getHandler = async (_: NextRequest, context: TContext) => {
  const { username } = await context.params
  const userFound = await userModel.findUniqueByUsername(username)
  const sessionUser = await session.getUser()
  return NextResponse.json(getUserDto(sessionUser, userFound))
}

const patchHandler = async (request: NextRequest, context: TContext) => {
  const params = await context.params
  const username = params.username
  const userInputValues = await request.json().catch(() => ({}))

  const sessionUser = await session.getUser()
  const targetUser = await userModel.findUniqueByUsername(username)

  if (!authorizationModel.can(sessionUser, 'update:user', targetUser)) {
    throw new ForbiddenError({
      message: 'Você não possui permissão para atualizar outro usuário.',
      action:
        'Verifique se você possui a feature necessária para atualizar outro usuário.'
    })
  }

  const updatedUser = await userModel.update(userInputValues, username)

  return NextResponse.json(getUserDto(sessionUser, updatedUser), {
    status: 200
  })
}

export const { GET, PATCH, DELETE, HEAD, OPTIONS, POST, PUT } = controller({
  GET: getHandler,
  PATCH: { handler: patchHandler, feature: 'update:user' }
})
