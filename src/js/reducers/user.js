// @flow

import {
  USER_LOGOUT,
  USER_LOGIN,
} from '../constants/actionTypes';
import type { ActionObj } from '../types/action';
import type { UserType } from '../types/user';
import userDefault from '../types/user';
import { STORAGE_SSKEY } from '../constants/storage';


/**
* User Reducer.
*/
export default function reducer(state: UserType = userDefault, action: ActionObj): UserType {
  switch (action.type) {
    case USER_LOGOUT:
      return {...userDefault};

    case USER_LOGIN:
      if (action.payload !== undefined && typeof action.payload.token === 'string') {
        sessionStorage.setItem(STORAGE_SSKEY, action.payload.token);
        return {...action.payload, loggedin: true };
      }

      break;

    default:
      return state;
  }

  return state;
}
