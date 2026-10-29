import { runner } from 'node-pg-migrate'

export type TRunMigration = Awaited<ReturnType<typeof runner>>[number]
