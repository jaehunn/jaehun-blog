import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/src(.*)$': '<rootDir>/src$1',
  },
});
