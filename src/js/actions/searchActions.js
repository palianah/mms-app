// @flow

import { SEARCH_ISSUES } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';


/**
* Search Actions
*/

export function search(term: string): ActionCreator {
  return {
    type: SEARCH_ISSUES,
    payload: { term },
  };
}