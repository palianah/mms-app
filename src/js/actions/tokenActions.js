// @flow

import {
  TOKEN_DEL,
  TOKEN_GET,
  TOKEN_SET,
} from '../constants/actionTypes';
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

export function get(): ActionCreator {
  return {
    type: TOKEN_GET
  };
}

export function del(): ActionCreator {
  return {
    type: TOKEN_DEL
  };
}