import { faker } from '@faker-js/faker'
import retry from 'async-retry'

import database from '@/infra/database'
import migrator from '@/server/models/migrator'
import session from '@/server/models/session'
import user from '@/server/models/user'
import { API_BASE_URL } from '@/shared/constants/base-url'
import { TCreateUserSchema } from '@/shared/schemas/user'
import { formatUsername } from '@/shared/utils/formatters'

const waitForAllServices = async () => {
  await retry(
    async () => {
      const response = await fetch(`${API_BASE_URL}/status`)
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

const createUser = async (userObject?: Partial<TCreateUserSchema>) =>
  await user.create({
    username: formatUsername(faker.internet.username()),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...userObject
  })

const createSession = async (userId: string) => await session.create(userId)

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
  createSession
}

export default orchestrator
