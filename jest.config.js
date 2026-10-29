import dotenv from 'dotenv'
import nextJest from 'next/jest.js'

// next/jest loads the test env files, not `.env.development`, which holds the local settings the tests need
// eslint-disable-next-line unicorn/no-top-level-side-effects
dotenv.config({
  path: '.env.development'
})

const createJestConfig = nextJest({
  dir: '.'
})

const jestConfig = createJestConfig({
  testEnvironment: 'jsdom',
  testTimeout: 60_000,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
})

export default jestConfig
