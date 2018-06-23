// @flow

import reducer from '../issues';
import repoDefault from '../../types/repo';
import {
  REPO_CHANGE,
} from '../../constants/actionTypes';


/**
* Issues Reducer Tests
*/

describe('Reducer: Issues', () => {
  const INITIAL_STATE = [];

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE'})).toEqual(INITIAL_STATE);
  });
});
