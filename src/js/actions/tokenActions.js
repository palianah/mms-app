// @flow

import { TOKEN_SET } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';
  
/**
* Token Actions
*/

export function set(token: string): ActionCreator {
  return {
    type: TOKEN_SET,
    payload: { token },
  };
}