// @flow

import reducer from '../search';
import {
  SEARCH_ISSUES,
} from '../../constants/actionTypes';


/**
* Search Reducer Tests
*/

describe('Reducer: Search', () => {
  const INITIAL_STATE = '';

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE'})).toEqual(INITIAL_STATE);
  });

  test('SEARCH_ISSUES should update the search term', () => {
    const testAction = {
      type: SEARCH_ISSUES,
      payload: { term: 'Test' },
    };
    expect(reducer(INITIAL_STATE, testAction)).toEqual(testAction.payload.term);
  });

  test('SEARCH_ISSUES should handle missing term', () => {
    const testAction = {
      type: SEARCH_ISSUES,
      payload: {},
    };
    expect(reducer(INITIAL_STATE, testAction)).toEqual(INITIAL_STATE);
  });
});
