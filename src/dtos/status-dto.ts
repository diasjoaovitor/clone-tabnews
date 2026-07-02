import { InternalServerError } from '@/infra'
import { authorizationModel, TStatus } from '@/models'
import { TGetDto } from '@/types'

export type TStatusDto = {
  updated_at: Date
  dependencies: {
    database: {
      version?: string
      max_connections: number
      opened_connections: number
    }
  }
}

export const getStatusDto: TGetDto<TStatus, TStatusDto> = (user, status) => {
  if (!user)
    throw new InternalServerError({
      cause:
        'É necessário fornecer um usuário (anônimo ou autenticado) em "getStatusDto".'
    })

  if (authorizationModel.can(user, 'read:status:all')) return status

  return {
    updated_at: status.updated_at,
    dependencies: {
      database: {
        max_connections: status.dependencies.database.max_connections,
        opened_connections: status.dependencies.database.opened_connections
      }
    }
  }
}
