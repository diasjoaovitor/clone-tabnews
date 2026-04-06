import { faker } from '@faker-js/faker'
import retry from 'async-retry'

import { API_BASE_URL } from '@/constants'
import { database } from '@/infra'
import {
  activationModel,
  migratorModel,
  sessionModel,
  TCreateUser,
  userModel
} from '@/models'
import { TFeature } from '@/repositories'
import { formatUsername } from '@/utils'

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
  await migratorModel.runPendingMigrations()
}

const createUser = async (userObject?: Partial<TCreateUser>) =>
  await userModel.create({
    username: formatUsername(faker.internet.username()),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...userObject
  })

const addFeaturesToUser = async (userId: string, features: TFeature[]) => {
  const updatedUser = await userModel.addFeatures(userId, features)
  return updatedUser
}

const activateUser = async (userId: string) => {
  const result = await activationModel.activateUserByUserId(userId)
  return result
}

const createSession = async (user_id: string) =>
  await sessionModel.create(user_id)

const deleteAllEmails = async () => {
  await fetch(`${emailHttpUrl}/messages`, {
    method: 'DELETE'
  })
}

type TLastEmail = {
  sender: string
  recipients: string[]
  subject: string
  text: string
}

const getLastEmail = async (): Promise<TLastEmail> => {
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

const extractUUID = (text: string) => {
  const match = text.match(/[0-9a-fA-F-]{36}/)
  return match ? match[0] : null
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
  addFeaturesToUser,
  activateUser,
  createSession,
  deleteAllEmails,
  getLastEmail,
  extractUUID
}

export default orchestrator
