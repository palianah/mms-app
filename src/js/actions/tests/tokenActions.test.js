// @flow

import { delToken, setToken } from '../tokenActions';
import {
  TOKEN_DEL,
  TOKEN_SET,
} from '../../constants/actionTypes';


/**
* Tocken Actions Tests
*/

describe('Actions: tokenActions', () => {
  test('TOKEN_SET is handled correctly', () => {
    const EXPECTED_ACTION = {
      type: TOKEN_SET,
      payload: { token: 'letmein' },
    };

    expect(setToken('letmein')).toEqual(EXPECTED_ACTION);
  });

  test('USER_DEL is handled correctly', () => {
    expect(delToken()).toEqual({ type: TOKEN_DEL });
  });
});