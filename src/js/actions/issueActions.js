// @flow

import {
  ISSUES_FETCH,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_SUCCESS,
  ISSUES_FETCH_SUCCESS_CACHE,
  ISSUES_SEARCH,
} from '../constants/actionTypes';
import searchIssuesQuery from '../gql/queries/searchIssues';
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
        endCursor: config.endCursor,
        hasNextPage: config.hasNextPage,
        perPage: config.perPage,
        repoName: config.repoName,
        repoOwner: config.repoOwner,
        sort: config.sort,
        sortField: config.sortField, 
        states: config.states,
        term: config.term,
      };

      return gqlQuery(searchIssuesQuery(issuesQueryConfig), config.token)
        .then((response: Object) => {
          if (response.data.errors !== undefined) {
            dispatch(fetchIssuesError({ errors: [...response.data.errors] }));
          } else {
            dispatch(fetchIssuesSuccess(response.data, issues));
          }
        })
        .catch((error: Object) => {
          const errors = (error.message) ? [error.message] : []; 
          dispatch(fetchIssuesError({ errors }));
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
  const pl = (payload.errors === undefined) ? {...payload, errors: []} : {...payload};
  return {
    type: ISSUES_FETCH_ERROR,
    error: true,
    payload: pl,
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