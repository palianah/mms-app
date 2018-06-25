// @flow
 
import {
  ISSUES_FETCH_SUCCESS,
} from '../constants/actionTypes';
import reduce from '../utils/reducers';
import type { ActionObj } from '../types/action';
import type { IssueType } from '../types/issue';
import issueDefault from '../types/issue';


/**
* Issue Data Reducer - the actual issues.
*/
export default function reducer(state: Array<IssueType> = [], action: ActionObj): Array<IssueType> {
  switch (action.type) {
    case ISSUES_FETCH_SUCCESS:
      if (action.payload !== undefined && action.payload.data !== undefined) {
        if (action.payload.data.repository !== undefined && action.payload.data.repository.issues !== undefined) {
          const { issues } = action.payload.data.repository;
          if (Array.isArray(issues.edges)) {
            issues.edges.forEach(i => {
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

              state = reduce.arr.addObj(state, newIssue);
            });

            return state;
          }
        }
      }
      break;

    default:
      return state;
  }

  return state;
}
