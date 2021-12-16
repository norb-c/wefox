module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  // setupFiles: ['<rootDir>/setuptest.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/']
};
