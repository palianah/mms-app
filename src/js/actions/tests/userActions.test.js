// @flow

import {
  loginUser,
  logoutUser,
} from '../userActions';
import {
  USER_LOGOUT,
  USER_LOGIN,
} from '../../constants/actionTypes';
import userDefault from '../../types/user';


/**
* User Actions Tests
*/

describe('Actions: userActions', () => {
  test('USER_LOGIN is handled correctly', () => {
    const userData = {...userDefault, username: 'kryton' };
    const EXPECTED_ACTION = {
      type: USER_LOGIN,
      payload: userData,
    };

    expect(loginUser(userData)).toEqual(EXPECTED_ACTION);
  });

  test('USER_LOGOUT is handled correctly', () => {
    expect(logoutUser()).toEqual({ type: USER_LOGOUT });
  });
});