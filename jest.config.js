module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/main.ts',
    '!src/**/index.ts',
    '!src/**/container.ts',
    '!src/**/logger/**',
    '!src/tests/**',
  ],
  coverageDirectory: 'src/tests/coverage',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};


