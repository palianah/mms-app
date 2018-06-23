// @flow

/**
* Reducers
*/
import { combineReducers } from 'redux';
import issues from './issues';
import repo from './repo';
import search from './search';
import token from './token';
import user from './user';

export default combineReducers({
  issues,
  repo,
  search,
  token,
  user,
});
