import { NextResponse } from 'next/server'

import { getUserDto } from '@/dtos'
import { controller, session } from '@/infra'
import { sessionModel, userModel } from '@/models'

const getHandler = async () => {
  const sessionUser = await session.getUser()

  const renewedSessionObject = await sessionModel.renew(sessionUser.sessionId!)

  await session.save(renewedSessionObject.token)

  const userFound = await userModel.findUniqueById(sessionUser.id!)

  const headers = new Headers()
  headers.set('Cache-Control', 'no-store, no-cache, max-age=0, must-revalidate')

  return NextResponse.json(getUserDto(userFound, userFound), {
    status: 200,
    headers
  })
}

export const { GET, DELETE, HEAD, OPTIONS, PATCH, POST, PUT } = controller({
  GET: { handler: getHandler, feature: 'read:session' }
})
