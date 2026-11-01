import { NextRequest, NextResponse } from 'next/server'

import { getActivationDto } from '@/dtos/activation-dto'
import { controller } from '@/infra/controller'
import { activationModel } from '@/models/activation-model/model'

const patchHandler = async (
  _: NextRequest,
  context: RouteContext<'/api/v1/activations/[token-id]'>
) => {
  const { 'token-id': tokenId } = await context.params

  const usedActivationToken =
    await activationModel.activateUserByTokenId(tokenId)

  return NextResponse.json(getActivationDto(null, usedActivationToken))
}

export const { GET, POST, PUT, PATCH, DELETE, OPTIONS } = controller({
  PATCH: {
    handler: patchHandler,
    feature: 'read:activation_token'
  }
})
