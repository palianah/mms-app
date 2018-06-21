// @flow

/**
* Store
*/

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers';

const initialState = {};
const reduxMiddleware = applyMiddleware(thunk);

const store = createStore(
  allReducers,
  initialState,
  reduxMiddleware
);

window.store = store; // Just for testing!!! Delete!!!
export default store;
