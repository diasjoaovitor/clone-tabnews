import { database } from '@/infra/database'

export const cleanDatabase = async () => {
  await database.query('drop schema public cascade; create schema public;')
}
