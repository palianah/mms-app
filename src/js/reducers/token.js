// @flow

import {
  TOKEN_DEL,
  TOKEN_SET,
} from '../constants/actionTypes';
import type { ActionObj } from '../types/action';
import { STORAGE_SSKEY } from '../constants/storage';


/**
* Token Reducer.
*/
export default function reducer(state: string = '', action: ActionObj): string {
  switch (action.type) {
    case TOKEN_DEL:
      sessionStorage.removeItem(STORAGE_SSKEY);
      return '';

    case TOKEN_SET:
      if (action.payload !== undefined && typeof action.payload.token === 'string') {
        sessionStorage.setItem(STORAGE_SSKEY, action.payload.token);
        return action.payload.token;
      }

      break;

    default:
      return state;
  }

  return state;
}
