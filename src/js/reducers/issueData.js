// @flow
 
import {
  ISSUES_FETCH_SUCCESS,
  ISSUES_FETCH_SUCCESS_CACHE,
} from '../constants/actionTypes';
import reduce from '../utils/reducers';
import type { ActionObj } from '../types/action';
import type { IssueType } from '../types/issue';
import type { IssueDataType } from '../types/issueData';
import issueDefault from '../types/issue';
import issueDataDefault from '../types/issueData';
import AppStorage, { getQueryItemKey } from '../storage/appStorage';


/**
* Issue Data Reducer - the actual issues.
*/
export default function reducer(state: IssueDataType = issueDataDefault, action: ActionObj): IssueDataType {
  switch (action.type) {
    case ISSUES_FETCH_SUCCESS_CACHE:
      if (action.payload !== undefined && action.payload.data !== undefined) {
        if (action.meta !== undefined && action.meta.issues !== undefined) {
          const { data } = action.payload;

          if (Array.isArray(data) && data.length > 0) {
            const cacheKey = getQueryItemKey(action.meta.issues);
            if (state[cacheKey] === undefined) state[cacheKey] = [];
            data.forEach(i => {
              state[cacheKey] = reduce.arr.addObj(state[cacheKey], i);
            });

            return state;
          }
        }
      }
      break;

    case ISSUES_FETCH_SUCCESS:
      if (action.payload !== undefined && action.payload.data !== undefined) {
        if (action.payload.data.search !== undefined && action.payload.data.search.edges !== undefined) {
          if (action.meta !== undefined && action.meta.issues !== undefined) {
            const { edges } = action.payload.data.search;
            if (Array.isArray(edges) && edges.length > 0) {
              const cacheKey = getQueryItemKey(action.meta.issues);
              if (state[cacheKey] === undefined) state[cacheKey] = [];

              edges.forEach(i => {
                if (i.node !== undefined && i.node.id !== undefined) {
                  const newIssue = { // Flatten data for easier cloning.
                    ...issueDefault,
                    id: i.node.id,
                    title: i.node.title,
                    authorName: i.node.author.login,
                    authorUrl: i.node.author.url,
                    authorAvatarUrl: i.node.author.avatarUrl,
                    participantCount: i.node.participants.totalCount,
                    commentCount: i.node.comments.totalCount,
                  };
    
                  state[cacheKey] = reduce.arr.addObj(state[cacheKey], newIssue);
                }
              });

              AppStorage.addItems(state[cacheKey], action.meta.issues);

              return state;
            }
          }
        }
      }
      break;

    default:
      return state;
  }

  return state;
}
