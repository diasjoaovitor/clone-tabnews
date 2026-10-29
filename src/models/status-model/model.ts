import { statusRepository } from '@/repositories/status-repository/repository'

import { Status } from './types'

const check = async (): Promise<Status> => {
  const updated_at = new Date()

  const [version, max_connections] = await Promise.all([
    statusRepository.getServerVersion(),
    statusRepository.getMaxConnections()
  ])
  const opened_connections = await statusRepository.getOpenedConnections()

  return {
    updated_at,
    dependencies: {
      database: {
        max_connections,
        opened_connections,
        version
      }
    }
  }
}

export const statusModel = {
  check
}
