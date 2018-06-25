// @flow

import reducer from '../online';
import { ONLINE_STATUS } from '../../constants/actionTypes';


/**
* Onlne Status Reducer Tests
*/

describe('Reducer: Online', () => {
  const INITIAL_STATE = true;

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE'})).toEqual(INITIAL_STATE);
  });

  test('Should handle ONLINE_STATUS correctly', () => {
    const testAction = {
      type: ONLINE_STATUS,
      payload: { status: true },
    };
    const testActionOffline = {
      type: ONLINE_STATUS,
      payload: { status: false },
    };
    expect(reducer(INITIAL_STATE, testAction)).toBe(true);
    expect(reducer(INITIAL_STATE, testActionOffline)).toBe(false);
  });
});
