import { NextRequest, NextResponse } from 'next/server'

import { controller } from '@/infra'
import { sessionModel, userModel } from '@/models'

const getHandler = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('session_id')?.value

  const sessionObject = await sessionModel.findUniqueValidByToken(
    sessionToken ?? ''
  )
  const renewedSessionObject = await sessionModel.renew(sessionObject.id)

  const headers = controller.setSessionCookie(renewedSessionObject.token)

  const userFound = await userModel.findUniqueById(sessionObject.user_id)

  headers.set('Cache-Control', 'no-store, no-cache, max-age=0, must-revalidate')

  return NextResponse.json(userFound, {
    status: 200,
    headers
  })
}

export const { GET, DELETE, HEAD, OPTIONS, PATCH, POST, PUT } =
  controller.handle({
    GET: getHandler
  })
