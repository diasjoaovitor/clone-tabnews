import { NextRequest, NextResponse } from 'next/server'

import { getActivationDto } from '@/dtos'
import { controller } from '@/infra'
import { activationModel } from '@/models'

const patchHandler = async (
  _: NextRequest,
  context: RouteContext<'/api/v1/activations/[token_id]'>
) => {
  const { token_id } = await context.params

  const validActivationToken =
    await activationModel.findUniqueValidById(token_id)

  await activationModel.activateUserByUserId(validActivationToken.user_id)

  const usedActivationToken = await activationModel.markTokenAsUsed(token_id)

  return NextResponse.json(getActivationDto(null, usedActivationToken))
}

export const { PATCH, DELETE, GET, HEAD, OPTIONS, POST, PUT } = controller({
  PATCH: {
    handler: patchHandler,
    feature: 'read:activation_token'
  }
})
