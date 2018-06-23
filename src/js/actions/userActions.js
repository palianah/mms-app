// @flow

import {
  USER_DEL,
  USER_SET,
} from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';
import type { UserType } from '../types/user';
  

/**
* User Actions
*/

export function setUser(user: UserType): ActionCreator {
  return {
    type: USER_SET,
    payload: user,
  };
}

export function delUser(): ActionCreator {
  return {
    type: USER_DEL
  };
}