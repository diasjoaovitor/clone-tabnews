import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import controller from '@/infra/controller'
import authentication from '@/server/models/authentication'
import session from '@/server/models/session'

const postHandler = async (request: NextRequest) => {
  const userInputValues = await request.json()
  const authenticatedUser = await authentication.getAuthenticatedUser({
    email: userInputValues.email,
    password: userInputValues.password
  })
  const newSession = await session.create(authenticatedUser.id)
  const headers = controller.setSessionCookie(newSession.token)
  const response = NextResponse.json(newSession, {
    status: 201,
    headers
  })
  return response
}

const deleteHandler = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('session_id')?.value
  const sessionObject = await session.findOneValidByToken(sessionToken ?? '')
  const expiredSession = await session.expireById(sessionObject.id)

  const headers = controller.clearSessionCookie()

  return NextResponse.json(expiredSession, {
    status: 200,
    headers
  })
}

export const { POST, DELETE, GET, HEAD, OPTIONS, PATCH, PUT } =
  controller.handleRequest({
    POST: postHandler,
    DELETE: deleteHandler
  })
