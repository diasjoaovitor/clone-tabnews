import retry from 'async-retry'

import { database } from '@/infra'
import { migrator } from '@/models'

const waitForAllServices = async () => {
  await retry(
    async () => {
      const response = await fetch('http://localhost:3000/api/v1/status')
      if (!response.ok) {
        throw new Error('Service not ready')
      }
    },
    {
      retries: 60,
      maxTimeout: 1000,
      minTimeout: 100
    }
  )
}

const clearDatabase = async () => {
  await database.query('drop schema public cascade; create schema public;')
}

const runPendingMigrations = async () => {
  await migrator.runPendingMigrations()
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations
}

export default orchestrator
