import { faker } from '@faker-js/faker'

import { TUserFeatures } from '@/constants'
import { database } from '@/infra'
import {
  activationModel,
  migratorModel,
  sessionModel,
  TCreateUser,
  userModel
} from '@/models'

import { formatUsername } from './_utils'

const emailHttpUrl = `http://${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}`

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

const addFeaturesToUser = async (userId: string, features: TUserFeatures[]) => {
  const updatedUser = await userModel.addFeatures(userId, features)
  return updatedUser
}

const activateUser = async (userId: string) => {
  const result = await activationModel.activateUserByUserId(userId)
  return result
}

const createSession = async (user_id: string) =>
  await sessionModel.create(user_id)

const createActivatedUserWithSession = async (
  userObject?: Partial<TCreateUser>,
  features?: TUserFeatures[]
) => {
  const createdUser = await createUser(userObject)
  let activatedUser = await activateUser(createdUser.id)
  if (features) {
    activatedUser = await addFeaturesToUser(activatedUser.id, features)
  }
  const sessionObject = await createSession(activatedUser.id)
  return { createdUser, activatedUser, sessionObject }
}

const deleteAllEmails = async () => {
  await fetch(`${emailHttpUrl}/api/v1/messages`, {
    method: 'DELETE'
  })
}

type TLastEmail = {
  sender: string
  recipients: string[]
  subject: string
  text: string
}

type TMailpitAddress = {
  Address: string
}

const getLastEmail = async (): Promise<TLastEmail> => {
  const emailListResponse = await fetch(`${emailHttpUrl}/api/v1/messages`)
  const emailListBody: { messages: { ID: string }[] } =
    await emailListResponse.json()
  const lastEmailItem = emailListBody.messages[0]

  const emailResponse = await fetch(
    `${emailHttpUrl}/api/v1/message/${lastEmailItem.ID}`
  )
  const emailBody: {
    From: TMailpitAddress
    To: TMailpitAddress[]
    Subject: string
    Text: string
  } = await emailResponse.json()

  return {
    sender: emailBody.From.Address,
    recipients: emailBody.To.map(({ Address }) => Address),
    subject: emailBody.Subject,
    text: emailBody.Text
  }
}

const extractUUID = (text: string) => {
  const match = text.match(/[0-9a-fA-F-]{36}/)
  return match ? match[0] : null
}

const orchestrator = {
  clearDatabase,
  runPendingMigrations,
  createUser,
  addFeaturesToUser,
  activateUser,
  createSession,
  createActivatedUserWithSession,
  deleteAllEmails,
  getLastEmail,
  extractUUID
}

export default orchestrator
