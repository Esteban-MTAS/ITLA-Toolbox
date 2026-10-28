module.exports = {
  preset: '@react-native/jest-preset',
  clearMocks: true,
  testTimeout: 30000,
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((@)?react-native|@react-navigation|@react-native-vector-icons)/)',
  ],
};
