import { runner } from 'node-pg-migrate'

export type Migration = Awaited<ReturnType<typeof runner>>[number]
