// @flow

import AppStorage from './local';
import userDefault from '../types/user';

/**
* Store
*/

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers';
import { STORAGE_SSKEY } from '../constants/storage';

const reduxMiddleware = applyMiddleware(thunk);
const token = AppStorage.get(STORAGE_SSKEY) || '';
let initialState = { user: {...userDefault, token } };

const store = createStore(
  allReducers,
  initialState,
  reduxMiddleware
);

window.store = store; // Just for testing!!! Delete!!!
export default store;
