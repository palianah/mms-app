// @flow

import {
  TOKEN_UPDATE,
} from '../constants/actionTypes';

import type { ActionObj } from '../types/action';


/**
* Token Reducer.
*/
export default function reducer(state: string = '', action: ActionObj) {
  switch (action.type) {
    case TOKEN_UPDATE:
      if (action.payload !== undefined && typeof action.payload.token === 'string') return action.payload.token;
      break;

    default:
      return state;
  }

  return state;
}
