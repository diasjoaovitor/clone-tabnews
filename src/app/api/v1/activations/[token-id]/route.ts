import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getActivationDto } from '@/dtos'
import { controller } from '@/infra'
import { activationModel } from '@/models'

const patchHandler = async (
  _: NextRequest,
  context: RouteContext<'/api/v1/activations/[token-id]'>
) => {
  const { 'token-id': tokenId } = await context.params
  z.uuid().parse(tokenId)

  const validActivationToken =
    await activationModel.findUniqueValidById(tokenId)

  await activationModel.activateUserByUserId(validActivationToken.user_id)

  const usedActivationToken = await activationModel.markTokenAsUsed(tokenId)

  return NextResponse.json(getActivationDto(null, usedActivationToken))
}

export const { PATCH, DELETE, GET, HEAD, OPTIONS, POST, PUT } = controller({
  PATCH: {
    handler: patchHandler,
    feature: 'read:activation_token'
  }
})
