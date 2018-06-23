// @flow

import reducer from '../user';
import {
  TOKEN_DEL,
  USER_DEL,
  USER_SET,
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

  test('Should update the user if payload exists', () => {
    const payload = {...userDefault, username: 'arnoldrimmer', loggedin: true };
    const testAction = {
      type: USER_SET,
      payload,
    };
    const noPayloadAction = {
      type: USER_SET,
    };
    expect(reducer(INITIAL_STATE, testAction)).toEqual(payload);
    expect(reducer(INITIAL_STATE, noPayloadAction)).toEqual(INITIAL_STATE);
  });

  test('Should delete the user', () => {
    const DEL_INITIAL_STATE = {...INITIAL_STATE, username: 'davelister'};
    expect(reducer(DEL_INITIAL_STATE, { type: TOKEN_DEL })).toEqual(INITIAL_STATE);
    expect(reducer(DEL_INITIAL_STATE, { type: USER_DEL })).toEqual(INITIAL_STATE);
  });
});
