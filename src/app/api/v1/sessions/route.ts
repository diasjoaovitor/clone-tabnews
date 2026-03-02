import { NextRequest, NextResponse } from 'next/server'

import { controller } from '@/infra'
import { authenticationModel, sessionModel } from '@/models'

const postHandler = async (request: NextRequest) => {
  const userInputValues = await request.json()
  const authenticatedUser = await authenticationModel.getAuthenticatedUser({
    email: userInputValues.email,
    password: userInputValues.password
  })
  const newSession = await sessionModel.create(authenticatedUser.id)
  const headers = controller.setSessionCookie(newSession.token)
  const response = NextResponse.json(newSession, {
    status: 201,
    headers
  })
  return response
}

const deleteHandler = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('session_id')?.value
  const sessionObject = await sessionModel.findUniqueValidByToken(
    sessionToken ?? ''
  )
  const expiredSession = await sessionModel.expires(sessionObject.id)

  const headers = controller.clearSessionCookie()

  return NextResponse.json(expiredSession, {
    status: 200,
    headers
  })
}

export const { POST, DELETE, GET, HEAD, OPTIONS, PATCH, PUT } =
  controller.handle({
    POST: postHandler,
    DELETE: deleteHandler
  })
