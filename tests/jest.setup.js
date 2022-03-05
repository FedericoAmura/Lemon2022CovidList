import 'react-native-gesture-handler/jestSetup';

import './__mocks__/axios';
import './__mocks__/encriptedStorage';
import './__mocks__/googleAuth';
import './__mocks__/timetravel';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

global.__reanimatedWorkletInit = jest.fn();

jest.useFakeTimers();
