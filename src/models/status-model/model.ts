import { statusRepository } from '@/repositories'

import { TStatus } from './types'

const check = async (): Promise<TStatus> => {
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
