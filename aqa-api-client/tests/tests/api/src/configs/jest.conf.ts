import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { setEnvVarFromCli } from '@rak-aqa/utils';

import { compilerOptions } from '../../tsconfig.json';

setEnvVarFromCli([
  {
    env: 'TEST_ENV',
    cli: 'testenv',
  },
  {
    env: 'TEST_URL',
    cli: 'testurl',
  },
]);

const config: Config.InitialOptions = {
  testTimeout: 120000,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './artifacts/junit',
        outputName: 'junit.xml',
      },
    ],
  ],
  testRunner: 'jest-jasmine2',
  testEnvironment: 'node',
  rootDir: process.cwd(),
  setupFilesAfterEnv: ['<rootDir>/src/configs/jest.setup.ts'],
  testMatch: ['**/tests/**/*.tests.ts'],
  testPathIgnorePatterns: ['/artifacts/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  moduleFileExtensions: ['js', 'ts'],
};

export default config;
