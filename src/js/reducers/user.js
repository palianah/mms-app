// @flow

import {
  TOKEN_DEL,
  USER_DEL,
  USER_SET,
} from '../constants/actionTypes';
import type { ActionObj } from '../types/action';
import type { UserType } from '../types/user';
import userDefault from '../types/user';


/**
* User Reducer.
*/
export default function reducer(state: UserType = userDefault, action: ActionObj): UserType {
  switch (action.type) {
    case TOKEN_DEL:
    case USER_DEL:
      return {...userDefault};

    case USER_SET:
      if (action.payload !== undefined) return {...action.payload, loggedin: true };
      break;

    default:
      return state;
  }

  return state;
}
