// @flow

import { ONLINE_STATUS } from '../constants/actionTypes';
import type { ActionObj } from '../types/action';


/**
* Onlne Status Reducer.
*/
export default function reducer(state: boolean = true, action: ActionObj): boolean {
  if (action.type === ONLINE_STATUS) {
    if (action.payload !== undefined && action.payload.status !== undefined) {
      return !!action.payload.status;
    }
  }
  
  return state;
}