// @flow

import reducer from '../issues';
import issuesDefault from '../../types/issues';
import {
  ISSUES_FETCH,
  ISSUES_SEARCH,
} from '../../constants/actionTypes';
import { GQL_ASC } from '../../constants/gql';


/**
* Issues Reducer Tests
*/

describe('Reducer: Issues', () => {
  const INITIAL_STATE = {...issuesDefault};

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE'})).toEqual(INITIAL_STATE);
  });

  test('ISSUES_FETCH should set fetching status', () => {
    const EXPECTED_STATE = {...issuesDefault, fetching: true };
    expect(reducer(INITIAL_STATE, { type: ISSUES_FETCH})).toEqual(EXPECTED_STATE);
  });

  test('ISSUES_SEARCH should update the search term', () => {
    const testAction = {
      type: ISSUES_SEARCH,
      payload: { term: 'Test', sort: GQL_ASC },
    };
    const EXPECTED_STATE = {...INITIAL_STATE, term: testAction.payload.term, sort: GQL_ASC};
    expect(reducer(INITIAL_STATE, testAction)).toEqual(EXPECTED_STATE);
  });

  test('ISSUES_SEARCH should handle missing term', () => {
    const testAction = {
      type: ISSUES_SEARCH,
      payload: {},
    };
    expect(reducer(INITIAL_STATE, testAction)).toEqual(INITIAL_STATE);
  });
});
