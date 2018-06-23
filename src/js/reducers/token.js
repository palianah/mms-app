// @flow

import {
  TOKEN_SET,
} from '../constants/actionTypes';

import type { ActionObj } from '../types/action';


/**
* Token Reducer.
*/
export default function reducer(state: string = '', action: ActionObj): string {
  switch (action.type) {
    case TOKEN_SET:
      if (action.payload !== undefined && typeof action.payload.token === 'string') return action.payload.token;
      break;

    default:
      return state;
  }

  return state;
}
