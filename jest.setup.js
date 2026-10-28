/* global jest */
jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);
jest.mock('@react-native-vector-icons/feather/static', () => ({
  Feather: 'Icon',
}));
jest.mock('react-native-sound', () =>
  jest.fn().mockImplementation(() => ({ release: jest.fn(), play: jest.fn() })),
);
