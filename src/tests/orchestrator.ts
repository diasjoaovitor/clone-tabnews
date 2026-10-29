import { faker } from '@faker-js/faker'

import { UserFeature } from '@/constants/features'
import { database } from '@/infra/database'
import { activationModel } from '@/models/activation-model/model'
import { migratorModel } from '@/models/migrator-model/model'
import { sessionModel } from '@/models/session-model/model'
import { userModel } from '@/models/user-model/model'
import { CreateUserInput } from '@/models/user-model/schema'
import { formatUsername } from '@/tests/_utils/formatters'

const emailHttpUrl = `http://${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}`

const clearDatabase = async () => {
  await database.query('drop schema public cascade; create schema public;')
}

const runPendingMigrations = async () => {
  await migratorModel.runPendingMigrations()
}

const createUser = async (userObject?: Partial<CreateUserInput>) =>
  await userModel.create({
    username: formatUsername(faker.internet.username()),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...userObject
  })

const addFeaturesToUser = async (userId: string, features: UserFeature[]) => {
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
  userObject?: Partial<CreateUserInput>,
  features?: UserFeature[]
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

type LastEmail = {
  sender: string
  recipients: string[]
  subject: string
  text: string
}

type MailpitAddress = {
  Address: string
}

const getLastEmail = async (): Promise<LastEmail> => {
  const emailListResponse = await fetch(`${emailHttpUrl}/api/v1/messages`)
  const emailListBody: { messages: { ID: string }[] } =
    await emailListResponse.json()
  const lastEmailItem = emailListBody.messages[0]

  const emailResponse = await fetch(
    `${emailHttpUrl}/api/v1/message/${lastEmailItem.ID}`
  )
  const emailBody: {
    From: MailpitAddress
    To: MailpitAddress[]
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
