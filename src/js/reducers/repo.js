// @flow

import {
  REPO_CHANGE,
} from '../constants/actionTypes';

import type { RepoType } from '../types/repo';
import repoDefault from '../types/repo';


/**
* Repo Reducer.
*/
export default function reducer(state: RepoType = repoDefault, action: Object) {
  switch (action.type) {
    case REPO_CHANGE:
      if (action.payload !== undefined && action.payload.name && action.payload.owner) {
        return { owner: action.payload.owner,  name: action.payload.name };
      }
      break;

    default:
      return state;
  }

  return state;
}
