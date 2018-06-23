// @flow

import {
  REPO_CHANGE,
} from '../constants/actionTypes';

import type { ActionObj } from '../types/action';
import type { RepoType } from '../types/repo';
import repoDefault from '../types/repo';


/**
* Repo Reducer.
*/
export default function reducer(state: RepoType = repoDefault, action: ActionObj): RepoType {
  switch (action.type) {
    case REPO_CHANGE:
      if (action.payload !== undefined) {
        const { name, owner } = action.payload;
        if (typeof name === 'string' && typeof owner === 'string') return { owner: owner,  name: name };
      }
      break;

    default:
      return state;
  }

  return state;
}
