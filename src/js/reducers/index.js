// @flow

/**
* Reducers
*/
import { combineReducers } from 'redux';
import issueData from './issueData';
import issues from './issues';
import online from './online';
import repo from './repo';
import user from './user';

export default combineReducers({
  issueData,
  issues,
  online,
  repo,
  user,
});
