// @flow

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers';
import checkOnlineStatus from '../middleware/checkOnlineStatus';
import { STORAGE_SSKEY } from '../constants/storage';
import AppStorage from './local';
import userDefault from '../types/user';


/**
* Store
*/

const reduxMiddleware = applyMiddleware(thunk, checkOnlineStatus);
const token = AppStorage.get(STORAGE_SSKEY) || '';
let initialState = { 
  online: navigator.onLine,
  user: {...userDefault, token },
};

const store = createStore(
  allReducers,
  initialState,
  reduxMiddleware
);

store.dispatch({type: 'TEST'});

window.store = store; // Just for testing!!! Delete!!!
export default store;
