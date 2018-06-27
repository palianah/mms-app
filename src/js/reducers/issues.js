// @flow
 
import {
  ISSUES_FETCH,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_SUCCESS,
  ISSUES_FETCH_SUCCESS_CACHE,
  ISSUES_SEARCH,
  USER_LOGOUT,
} from '../constants/actionTypes';
import { GQL_ASC, GQL_DESC } from '../constants/gql';
import type { ActionObj } from '../types/action';
import type { IssuesType } from '../types/issues';
import issuesDefault from '../types/issues';
import AppStorage, { getQueryItemKey, ISSUE_PAGING_KEY, ISSUE_TOTAL_KEY } from '../storage/appStorage';

/**
* Issues Reducer - just for settings about the issues.
*/
export default function reducer(state: IssuesType = issuesDefault, action: ActionObj): Object {
  const CACHE_KEY = getQueryItemKey(state, ISSUE_TOTAL_KEY);
  const CACHE_PAGING_KEY = getQueryItemKey(state, ISSUE_PAGING_KEY);

  switch (action.type) {
    case USER_LOGOUT:
      return {...issuesDefault };

    case ISSUES_FETCH:
      return {...state, fetching: true, error: false };

    case ISSUES_FETCH_ERROR:
      if (action.payload !== undefined && action.payload.errors !== undefined) {
        const errorMsg = (action.payload.errors) ? action.payload.errors: [];
        return {...state, fetching: false, error: true, errorMsg };
      }
      break;

    case ISSUES_FETCH_SUCCESS:
      if (action.payload !== undefined && action.payload.data !== undefined) {
        if (action.payload.data.search !== undefined && action.payload.data.search.edges !== undefined) {
          const { edges, issueCount } = action.payload.data.search;
          const { endCursor, hasNextPage } = action.payload.data.search.pageInfo;
          let lastCursor = false;

          if (Array.isArray(edges)) {
            const lastNode = edges[edges.length -1];
            if (lastNode.cursor !== undefined) lastCursor = lastNode.cursor;

            AppStorage.set(CACHE_KEY, issueCount);
            AppStorage.set(CACHE_PAGING_KEY, { endCursor: (lastCursor || endCursor), hasNextPage });
            return {...state, fetching: false, error: false, totalCount: issueCount, endCursor: (lastCursor || endCursor), hasNextPage };
          }
        }
      }
      break;

    case ISSUES_FETCH_SUCCESS_CACHE:
      if (action.payload !== undefined && action.payload.data !== undefined) {
        if (Array.isArray(action.payload.data)) {
          const TOTAL = AppStorage.get(CACHE_KEY);
          const PAGING = AppStorage.get(CACHE_PAGING_KEY);
          let pagingObj = {
            endCursor: '',
            hasNextPage: false
          };

          if (PAGING !== null) pagingObj = {...pagingObj, ...PAGING};
          
          return {...state, fetching: false, error: false, totalCount: TOTAL, endCursor: pagingObj.endCursor, hasNextPage: pagingObj.hasNextPage };
        }
      }
      break;

    case ISSUES_SEARCH:
      if (action.payload !== undefined) {
        const newProps = {};
        const oldTerm = state.term;
        const oldSort = state.sort;
        if (typeof action.payload.term === 'string' ) newProps.term = action.payload.term.trim();
        if (action.payload.sort === GQL_ASC || action.payload.sort === GQL_DESC) newProps.sort = action.payload.sort;
        
        if (oldSort !== newProps.sort || oldTerm !== newProps.term) {
          newProps.endCursor = '';
          newProps.hasNextPage = false;
        }
        
        return {...state, ...newProps};
      }
      break;

    default:
      return state;
  }

  return state;
}
