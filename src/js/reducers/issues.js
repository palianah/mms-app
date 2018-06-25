// @flow
 
import {
  ISSUES_FETCH,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_SUCCESS,
  ISSUES_FETCH_SUCCESS_CACHE,
  ISSUES_SEARCH,
} from '../constants/actionTypes';
import { GQL_ASC, GQL_DESC } from '../constants/gql';
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

    case ISSUES_FETCH_SUCCESS_CACHE:
      if (action.payload !== undefined && action.payload.data !== undefined) {
        if (Array.isArray(action.payload.data)) {
          return {...state, fetching: false, error: false, totalCount: action.payload.data.length };
        }
      }
      break;

    case ISSUES_SEARCH:
      if (action.payload !== undefined) {
        const newProps = {};
        if (typeof action.payload.term === 'string' ) newProps.term = action.payload.term;
        if (action.payload.sort === GQL_ASC || action.payload.sort === GQL_DESC) newProps.sort = action.payload.sort;
        
        return {...state, ...newProps};
      }
      break;

    default:
      return state;
  }

  return state;
}
