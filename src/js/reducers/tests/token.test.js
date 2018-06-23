// @flow

import reducer from '../token';
import {
  TOKEN_DEL,
  TOKEN_SET,
} from '../../constants/actionTypes';


/**
* Token Reducer Tests
*/

describe('Reducer: Repo', () => {
  const INITIAL_STATE = '';

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE'})).toEqual(INITIAL_STATE);
  });

  test('Should update the token if in payload', () => {
    const testAction = {
      type: TOKEN_SET,
      payload: { token: 'letmein' },
    };
    expect(reducer(INITIAL_STATE, testAction)).toEqual(testAction.payload.token);
  });

  test('Should return existing state if the token is not a string', () => {
    const booleanAction = {
      type: TOKEN_SET,
      payload: { token: false },
    };
    const undefinedAction = {
      type: TOKEN_SET,
      payload: { token: undefined },
    };
    const integerAction = {
      type: TOKEN_SET,
      payload: { token: 2323 },
    };
    expect(reducer(INITIAL_STATE, booleanAction)).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, undefinedAction)).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, integerAction)).toEqual(INITIAL_STATE);
  });

  test('Should delete the token', () => {
    expect(reducer('Sketchbuch', { type: TOKEN_DEL })).toEqual(INITIAL_STATE);
  });
});
