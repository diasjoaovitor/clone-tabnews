import { faker } from '@faker-js/faker'
import retry from 'async-retry'

import database from '@/infra/database'
import migrator from '@/server/models/migrator'
import session from '@/server/models/session'
import user from '@/server/models/user'
import { API_BASE_URL } from '@/shared/constants/base-url'
import { TCreateUserSchema } from '@/shared/schemas/user'
import { formatUsername } from '@/shared/utils/formatters'

const emailHttpUrl = `http://${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}`

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

const deleteAllEmails = async () => {
  await fetch(`${emailHttpUrl}/messages`, {
    method: 'DELETE'
  })
}

const getLastEmail = async () => {
  const emailListResponse = await fetch(`${emailHttpUrl}/messages`)
  const emailListBody = await emailListResponse.json()
  const lastEmailItem = emailListBody.at(-1)

  const emailTextResponse = await fetch(
    `${emailHttpUrl}/messages/${lastEmailItem.id}.plain`
  )
  const emailTextBody = await emailTextResponse.text()

  lastEmailItem.text = emailTextBody
  return lastEmailItem
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
  createSession,
  deleteAllEmails,
  getLastEmail
}

export default orchestrator
