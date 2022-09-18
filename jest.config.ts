import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: false,
  bail: 1,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
export default config