const nextJest = require('next/jest')
const dotenv = require('dotenv')

dotenv.config({
  path: '.env.development'
})

const createJestConfig = nextJest({
  dir: '.'
})

const jestConfig = createJestConfig({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
})

module.exports = jestConfig
