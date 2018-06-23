// @flow

import * as searchActions from '../searchActions';
import { SEARCH_ISSUES } from '../../constants/actionTypes';


/**
* Search Actions Tests
*/

describe('Actions: searchActions', () => {
  test('search() should set the term', () => {
    const searchTerm = 'Test';
    const EXPECTED_ACTION = {
      type: SEARCH_ISSUES,
      payload: { term: searchTerm },
    };

    expect(searchActions.search(searchTerm)).toEqual(EXPECTED_ACTION);
  });
});