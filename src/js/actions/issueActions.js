// @flow

import issuesQuery from '../gql/queries/issues';
import {
  ISSUES_FETCH,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_SUCCESS,
  ISSUES_FETCH_SUCCESS_CACHE,
  ISSUES_SEARCH,
} from '../constants/actionTypes';
import type { IssuesType } from '../types/issues';
import type { ActionCreator } from '../types/action';
import AppStorage, { getQueryItemKey } from '../storage/appStorage';
  

/**
* Issue Actions
*/
export function fetchIssues(gqlQuery: Function, config: Object, issues: IssuesType): ActionCreator {
  return (dispatch, getState) => {
    dispatch({ type: ISSUES_FETCH });

    let cacheKey = '';
    let cachedData = null;

    if (!navigator.onLine) {
      cacheKey = getQueryItemKey(issues);
      cachedData = AppStorage.get(cacheKey);
    
      if (cachedData !== null) {
        dispatch(fetchIssuesSuccessCache(cachedData, issues));
      } else {
        dispatch(fetchIssuesSuccessCache([], issues));
      }

    } else {
      const issuesQueryConfig = {
        repoOwner: config.repoOwner,
        repoName: config.repoName,
        issues: {
          last: config.perPage,
          states: config.states,
          ob: { 
            field: config.sortField, 
            dir: config.sort,
          },
        },
      };

      return gqlQuery(issuesQuery(issuesQueryConfig), config.token)
        .then((response: Object) => {
          if (response.data.errors !== undefined) {
            dispatch(fetchIssuesError(response.data.errors));
          } else {
            dispatch(fetchIssuesSuccess(response.data, issues));
          }
        })
        .catch((error: Object) => {
          dispatch(fetchIssuesError(error));
        });
    }
  };
}

export function fetchIssuesSuccess(payload: Object, issues: IssuesType): ActionCreator {
  return {
    type: ISSUES_FETCH_SUCCESS,
    payload,
    meta: { issues },
  };
}

export function fetchIssuesError(payload: Object): ActionCreator {
  return {
    type: ISSUES_FETCH_ERROR,
    error: true,
    payload,
  };
}

export function searchIssues(term: string, sort: string): ActionCreator {
  return {
    type: ISSUES_SEARCH,
    payload: { term, sort },
  };
}

export function fetchIssuesSuccessCache(data: Array<Object>, issues: IssuesType): ActionCreator {
  return {
    type: ISSUES_FETCH_SUCCESS_CACHE,
    payload: { data },
    meta: { issues },
  };
}