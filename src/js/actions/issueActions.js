// @flow

import issuesQuery from '../gql/queries/issues';
import {
  ISSUES_FETCH,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_SUCCESS,
  ISSUES_SEARCH,
} from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';
  

/**
* Issue Actions
*/
export function fetchIssues(gqlQuery: Function, config: Object): ActionCreator {
  return (dispatch, getState) => {
    dispatch({ type: ISSUES_FETCH });

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
          dispatch(fetchIssuesSuccess(response.data));
        }
      })
      .catch((error: Object) => {
        dispatch(fetchIssuesError(error));
      });
  };
}

export function fetchIssuesSuccess(payload: Object): ActionCreator {
  return {
    type: ISSUES_FETCH_SUCCESS,
    payload,
  };
}

export function fetchIssuesError(payload: Object): ActionCreator {
  return {
    type: ISSUES_FETCH_ERROR,
    error: true,
    payload,
  };
}
export function searchIssues(term: string): ActionCreator {
  console.log('searchIssues ac');
  return {
    type: ISSUES_SEARCH,
    payload: { term },
  };
}