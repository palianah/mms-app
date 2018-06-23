// @flow
/* 
import {
  REPO_CHANGE,
} from '../constants/actionTypes'; */

import type { ActionObj } from '../types/action';
import type { IssueType } from '../types/issue';


/**
* Repo Reducer.
*/
export default function reducer(state: Array<IssueType> = [], action: ActionObj): Array<IssueType> {
  switch (action.type) {
    default:
      return state;
  }
}
