// @flow

import {
  SEARCH_ISSUES,
} from '../constants/actionTypes';

import type { ActionObj } from '../types/action';


/**
* Search Reducer.
*/
export default function reducer(state: string = '', action: ActionObj): string {
  switch (action.type) {
    case SEARCH_ISSUES:
      if (action.payload !== undefined && typeof action.payload.term === 'string') {
        return action.payload.term;
      }
      break;

    default:
      return state;
  }

  return state;
}
