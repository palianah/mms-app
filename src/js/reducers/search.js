// @flow

import {
  SEARCH_ISSUES,
} from '../constants/actionTypes';

import type { ActionObj } from '../types/action';


/**
* Search Reducer.
*/
export default function reducer(state: string = '', action: ActionObj) {
  switch (action.type) {
    case SEARCH_ISSUES:
      if (action.payload !== undefined && action.payload.term !== undefined) {
        return action.payload.term;
      }
      break;

    default:
      return state;
  }

  return state;
}
