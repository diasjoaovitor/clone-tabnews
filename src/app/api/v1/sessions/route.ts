import { NextRequest, NextResponse } from 'next/server'

import { getSessionDto } from '@/dtos'
import { controller, ForbiddenError, session } from '@/infra'
import { authenticationModel, authorizationModel, sessionModel } from '@/models'

const postHandler = async (request: NextRequest) => {
  const userInputValues = await request.json()
  const authenticatedUser = await authenticationModel.getAuthenticatedUser({
    email: userInputValues.email,
    password: userInputValues.password
  })
  if (!authorizationModel.can(authenticatedUser, 'create:session')) {
    throw new ForbiddenError({
      message: 'Você não possui permissão para fazer login.',
      action: 'Contate o suporte caso você acredite que isto seja um erro.'
    })
  }
  const newSession = await sessionModel.create(authenticatedUser.id)
  await session.save(newSession.token)
  return NextResponse.json(getSessionDto(authenticatedUser, newSession), {
    status: 201
  })
}

const deleteHandler = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('session_id')?.value
  const sessionObject = await sessionModel.findUniqueValidByToken(
    sessionToken ?? ''
  )
  const user = await session.getUser()
  const expiredSession = await sessionModel.expires(sessionObject.id)
  await session.clear()
  return NextResponse.json(getSessionDto(user, expiredSession), {
    status: 200
  })
}

export const { POST, DELETE, GET, HEAD, OPTIONS, PATCH, PUT } = controller({
  POST: { handler: postHandler, feature: 'create:session' },
  DELETE: deleteHandler
})
