// @flow

import {
  USER_LOGOUT,
  USER_LOGIN,
} from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';
import type { UserType } from '../types/user';
  

/**
* User Actions
*/

export function loginUser(user: UserType): ActionCreator {
  return {
    type: USER_LOGIN,
    payload: user,
  };
}

export function logoutUser(): ActionCreator {
  return {
    type: USER_LOGOUT
  };
}
