// @flow

import { setUser, delUser } from '../userActions';
import { USER_DEL, USER_SET } from '../../constants/actionTypes';
import userDefault from '../../types/user';


/**
* User Actions Tests
*/

describe('Actions: userActions', () => {
  test('USER_SET is handled correctly', () => {
    const userData = {...userDefault, username: 'kryton' };
    const EXPECTED_ACTION = {
      type: USER_SET,
      payload: userData,
    };

    expect(setUser(userData)).toEqual(EXPECTED_ACTION);
  });

  test('USER_DEL is handled correctly', () => {
    expect(delUser()).toEqual({ type: USER_DEL });
  });
});