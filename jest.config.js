import dotenv from 'dotenv'
import nextJest from 'next/jest.js'

dotenv.config({
  path: '.env.development'
})

const createJestConfig = nextJest({
  dir: '.'
})

const jestConfig = createJestConfig({
  testEnvironment: 'jsdom',
  testTimeout: 60000,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
})

export default jestConfig
