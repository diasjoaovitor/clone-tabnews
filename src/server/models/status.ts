import statusRepository from '@/server/repositories/status'
import { TStatus } from '@/shared/types/status'

const check = async (): Promise<TStatus> => {
  const serverVersion = await statusRepository.getServerVersion()
  const maxConnections = await statusRepository.getMaxConnections()
  const openedConnections = await statusRepository.getOpenedConnections()

  const updatedAt = new Date().toISOString()

  return {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersion,
        max_connections: maxConnections,
        opened_connections: openedConnections
      }
    }
  }
}

const status = { check }

export default status
