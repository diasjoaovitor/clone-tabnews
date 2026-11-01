import { HTTP_METHOD, HTTP_METHODS } from 'next/dist/server/web/http'
import { unstable_rethrow } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { UserFeature } from '@/constants/features'

import { can } from './authorization'
import {
  MethodNotAllowedError,
  normalizeError,
  UnauthorizedError
} from './errors'
import { session } from './session'

// Each route types its own context (`RouteContext<'/api/v1/...'>`), and such a handler isn't assignable
// to one whose context is `unknown`
type RouteHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse>

type RouteConfig = {
  handler: RouteHandler
  feature?: UserFeature
}

type RequestsConfig = {
  [key in HTTP_METHOD]?: RouteHandler | RouteConfig
}

type RequestsResult = Record<HTTP_METHOD, RouteHandler>

const onNoMatchHandler = async (): Promise<NextResponse> => {
  const publicErrorObject = new MethodNotAllowedError()
  return NextResponse.json(publicErrorObject, {
    status: publicErrorObject.statusCode
  })
}

const onErrorHandler = async (error_: unknown): Promise<NextResponse> => {
  const error = normalizeError(error_)
  if (error.statusCode >= 500) console.error(error)
  if (error instanceof UnauthorizedError) await session.clear()
  return NextResponse.json(error, { status: error.statusCode })
}

export const controller = (
  availableRequests: Partial<RequestsConfig>
): RequestsResult => {
  const requests: Partial<RequestsResult> = {}
  for (const method of HTTP_METHODS) {
    const routeDefinition = availableRequests[method]
    let routeHandler: RouteHandler | undefined
    let feature: UserFeature | undefined
    if (typeof routeDefinition === 'function') {
      routeHandler = routeDefinition
    } else {
      routeHandler = routeDefinition?.handler
      feature = routeDefinition?.feature
    }
    const handler = async (
      request: NextRequest,
      context?: Parameters<RouteHandler>[1]
    ): Promise<NextResponse> => {
      try {
        if (feature) {
          const user = await session.getUser()
          can(user, feature)
        }
        const response = await routeHandler!(request, context)
        return response
      } catch (error) {
        // Request-time APIs such as `cookies()` throw to opt out of prerendering:
        // https://nextjs.org/docs/app/api-reference/functions/unstable_rethrow
        unstable_rethrow(error)
        return onErrorHandler(error)
      }
    }
    requests[method] = routeHandler ? handler : onNoMatchHandler
  }
  return requests as RequestsResult
}
