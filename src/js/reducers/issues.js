// @flow
 
import {
  ISSUES_FETCH,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_SUCCESS,
  ISSUES_SEARCH,
} from '../constants/actionTypes';

import type { ActionObj } from '../types/action';
import type { IssuesType } from '../types/issues';
import defaultIssues from '../types/issues';


/**
* Issues Reducer - just for settings about the issues.
*/
export default function reducer(state: IssuesType = defaultIssues, action: ActionObj): Object {
  switch (action.type) {
    case ISSUES_FETCH:
      return {...state, fetching: true, error: false };

    case ISSUES_FETCH_ERROR:
      if (action.payload !== undefined) {
        let errorMsg = [];

        if (action.payload.message !== undefined) { // Network error (Axios Error)
          errorMsg.push(action.payload.message);
        } else { // Server side error (Github API Error)
          action.payload.forEach(element => {
            errorMsg.push(element.message);
          });
        }

        return {...state, fetching: false, error: true, errorMsg };
      }
      break;

    case ISSUES_FETCH_SUCCESS:
      if (action.payload !== undefined && action.payload.data !== undefined) {
        if (action.payload.data.repository !== undefined && action.payload.data.repository.issues !== undefined) {
          const { issues } = action.payload.data.repository;
          if (Array.isArray(issues.edges)) {
            return {...state, fetching: false, error: false, totalCount: issues.totalCount };
          }
        }
      }
      break;

    case ISSUES_SEARCH:
      if (action.payload !== undefined && typeof action.payload.term === 'string') {
        return {...state, term: action.payload.term }
      }
      break;

    default:
      return state;
  }

  return state;
}
