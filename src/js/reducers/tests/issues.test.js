// @flow

import reducer from '../issues';
import issuesDefault from '../../types/issues';
import {
  ISSUES_FETCH,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_SUCCESS,
  ISSUES_FETCH_SUCCESS_CACHE,
  ISSUES_SEARCH,
  USER_LOGOUT,
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

  test('USER_LOGOUT should return the default issues object', () => {
    const EXPECTED_STATE = {...issuesDefault};
    expect(reducer(INITIAL_STATE, { type: USER_LOGOUT})).toEqual(EXPECTED_STATE);
  });

  test('ISSUES_FETCH should set fetching status', () => {
    const EXPECTED_STATE = {...issuesDefault, fetching: true };
    expect(reducer(INITIAL_STATE, { type: ISSUES_FETCH})).toEqual(EXPECTED_STATE);
  });

  test('ISSUES_FETCH_ERROR should return an object containing errors', () => {
    const ERR_MSGS = [
      'Danger. Do not attempt to open this pod.',
      'The creature inside is extremely hostile.',
      'It feeds off the human psyche, seeks out the deranged, the unbalanced and the emotionally crippled.',
    ];
    const EXPECTED_STATE = {
      ...issuesDefault,
      fetching: false,
      error: true,
      errorMsg: [...ERR_MSGS],
    };
    const ACTION = {
      type: ISSUES_FETCH_ERROR,
      payload: { errors: [...ERR_MSGS] },
    };

    expect(reducer(INITIAL_STATE, ACTION)).toEqual(EXPECTED_STATE);
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
