// @flow

import {
  TOKEN_DEL,
  TOKEN_SET,
} from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';
  

/**
* Token Actions
*/

export function setToken(token: string): ActionCreator {
  return {
    type: TOKEN_SET,
    payload: { token },
  };
}

export function delToken(): ActionCreator {
  return {
    type: TOKEN_DEL
  };
}