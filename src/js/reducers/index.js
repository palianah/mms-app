// @flow

/**
* Reducers
*/
import { combineReducers } from 'redux';
import issueData from './issueData';
import issues from './issues';
import repo from './repo';
import user from './user';

export default combineReducers({
  issueData,
  issues,
  repo,
  user,
});
