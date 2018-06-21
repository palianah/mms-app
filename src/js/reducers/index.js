// @flow

/**
* Reducers
*/
import { combineReducers } from 'redux';
import issues from './issues';
import repo from './repo';
import search from './search';


export default combineReducers({
  issues,
  repo,
  search,
});
