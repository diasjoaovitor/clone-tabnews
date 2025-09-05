import { NextRequest, NextResponse } from 'next/server'

import controller from '@/infra/controller'
import session from '@/server/models/session'
import user from '@/server/models/user'

const getHandler = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('session_id')!.value

  const sessionObject = await session.findOneValidByToken(sessionToken)
  const renewedSessionObject = await session.renew(sessionObject.id)

  const headers = controller.setSessionCookie(renewedSessionObject.token)

  const userFound = await user.findOneById(sessionObject.user_id)

  headers.set('Cache-Control', 'no-store, no-cache, max-age=0, must-revalidate')

  return NextResponse.json(userFound, {
    status: 200,
    headers
  })
}

export const { GET, DELETE, HEAD, OPTIONS, PATCH, POST, PUT } =
  controller.handleRequest({
    GET: getHandler
  })
