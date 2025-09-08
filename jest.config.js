module.exports = {
  // Default environment for all tests
  testEnvironment: 'node',

  // Setup files for global polyfills
  setupFiles: ['./jest.setup.js'],

  // Use projects to separate client and server tests
  projects: [
    {
      displayName: 'client',
      testMatch: ['<rootDir>/client/src/**/*.test.js'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['@testing-library/jest-dom'],
      transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',  // if you use babel for JSX
      },
      moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    },
    {
      displayName: 'server',
      testMatch: ['<rootDir>/server/jest/**/*.test.js'],
      testEnvironment: 'node',
    },
  ],
};

