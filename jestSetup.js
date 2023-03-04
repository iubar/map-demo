/**
* @see https://react-native-community.github.io/async-storage/docs/advanced/jest
*/

jest.mock('expo-font');
jest.mock('expo-asset');

import 'setimmediate';

//import { enableFetchMocks } from 'jest-fetch-mock'
//enableFetchMocks()

//import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';


 

// jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

/*
jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
  default: () => ({getInitialState: {then: jest.fn()}}),
  __esModule: true,
}));
*/


/*
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
  
    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated.default.call = () => {};
  
    return Reanimated;
  });
 */