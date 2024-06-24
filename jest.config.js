module.exports = {
  roots: ['<rootDir>'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  // coverageThreshold: {
  //   global: {
  //     statements: 80,
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //   },
  // },
  testEnvironment: 'node',
  clearMocks: true,
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
