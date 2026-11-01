import { unstable_rethrow } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { UserFeature } from '@/constants/features'

import { authorize } from './authorization'
import {
  MethodNotAllowedError,
  normalizeError,
  UnauthorizedError
} from './errors'
import { session } from './session'

// HEAD is left out so Next.js implements it from the exported GET (RFC 9110 §9.1). OPTIONS is answered by
// the controller, since Next.js's own lists every exported method in `Allow`, even those that answer `405`.
// The list is copied instead of imported, since `next/dist/server/web/http` isn't public
export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const

export type HttpMethod = (typeof HTTP_METHODS)[number]

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
  [key in HttpMethod]?: RouteHandler | RouteConfig
}

type RequestsResult = Record<HttpMethod | 'OPTIONS', RouteHandler>

const getAllowHeader = (methods: HttpMethod[]): string =>
  [
    ...methods.flatMap((method) =>
      method === 'GET' ? ['GET', 'HEAD'] : method
    ),
    'OPTIONS'
  ].join(', ')

const createOptionsHandler =
  (allow: string): RouteHandler =>
  async () =>
    new NextResponse(null, { status: 204, headers: { Allow: allow } })

const createNoMatchHandler =
  (allow: string): RouteHandler =>
  async () => {
    const publicErrorObject = new MethodNotAllowedError()
    return NextResponse.json(publicErrorObject, {
      status: publicErrorObject.statusCode,
      headers: { Allow: allow }
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
  const allow = getAllowHeader(
    HTTP_METHODS.filter((method) => availableRequests[method])
  )
  const onNoMatchHandler = createNoMatchHandler(allow)
  const requests: Partial<RequestsResult> = {
    OPTIONS: createOptionsHandler(allow)
  }
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
        const resolvedSession = await session.resolveAndClearInvalid()
        authorize(resolvedSession, feature)
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
