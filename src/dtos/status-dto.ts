import { authorizationModel } from '@/models/authorization-model/model'
import { Status } from '@/models/status-model/types'
import { DtoGetter } from '@/types/generics'

export type StatusDto = {
  updated_at: Date
  dependencies: {
    database: {
      version?: string
      max_connections: number
      opened_connections: number
    }
  }
}

export const getStatusDto: DtoGetter<Status, StatusDto> = (user, status) => {
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
