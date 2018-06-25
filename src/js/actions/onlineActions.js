// @flow

import { ONLINE_STATUS } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';
  

/**
* Online Status Actions
*/
export function setOnlineStatus(status: boolean): ActionCreator {
  return {
    type: ONLINE_STATUS,
    payload: { status },
  };
}