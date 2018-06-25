// @flow

import reducer from '../user';
import {
  USER_LOGOUT,
  USER_LOGIN,
} from '../../constants/actionTypes';
import userDefault from '../../types/user';


/**
* User Reducer Tests
*/

describe('Reducer: User', () => {
  const INITIAL_STATE = {...userDefault};

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE'})).toEqual(INITIAL_STATE);
  });

  test('USER_LOGIN should set the user data if payload exists', () => {
    const payload = {...userDefault, username: 'arnoldrimmer', loggedin: true };
    const testAction = {
      type: USER_LOGIN,
      payload,
    };
    const noPayloadAction = {
      type: USER_LOGIN,
    };
    expect(reducer(INITIAL_STATE, testAction)).toEqual(payload);
    expect(reducer(INITIAL_STATE, noPayloadAction)).toEqual(INITIAL_STATE);
  });

  test('USER_LOGOUT should return remove all user data from the store', () => {
    const DEL_INITIAL_STATE = {...INITIAL_STATE, loggedin: true, token: 'letmein', username: 'davelister' };
    expect(reducer(DEL_INITIAL_STATE, { type: USER_LOGOUT })).toEqual(INITIAL_STATE);
  });
});
