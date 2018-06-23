// @flow

/**
* Store
*/

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers';
import { STORAGE_SSKEY } from '../constants/storage';

const reduxMiddleware = applyMiddleware(thunk);
const sessionToken = sessionStorage.getItem(STORAGE_SSKEY);

let initialState = {};
if (sessionToken !== null) initialState.token = sessionToken;

const store = createStore(
  allReducers,
  initialState,
  reduxMiddleware
);

window.store = store; // Just for testing!!! Delete!!!
export default store;
