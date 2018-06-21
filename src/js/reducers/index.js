// @flow

/**
* Reducers
*/
import { combineReducers } from 'redux';
import issues from './issues';
import repo from './repo';


export default combineReducers({
  issues,
  repo,
});
