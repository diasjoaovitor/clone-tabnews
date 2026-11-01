import { NextResponse } from 'next/server'

import { getUserDto } from '@/dtos/user-dto'
import { controller } from '@/entry/controller'
import { session } from '@/entry/session'
import { sessionModel } from '@/models/session-model/model'
import { userModel } from '@/models/user-model/model'

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

export const { GET, POST, PUT, PATCH, DELETE, OPTIONS } = controller({
  GET: { handler: getHandler, feature: 'read:session' }
})
