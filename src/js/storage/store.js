// @flow

import userDefault from '../types/user';

/**
* Store
*/

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers';
import { STORAGE_SSKEY } from '../constants/storage';

const reduxMiddleware = applyMiddleware(thunk);
const token = sessionStorage.getItem(STORAGE_SSKEY) || '';
let initialState = { user: {...userDefault, token } };

const store = createStore(
  allReducers,
  initialState,
  reduxMiddleware
);

window.store = store; // Just for testing!!! Delete!!!
export default store;
