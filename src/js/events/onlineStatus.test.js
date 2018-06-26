// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { appCheckConnection } from './onlineStatus';
import { ONLINE_STATUS } from '../constants/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

describe('Event: onlineStatus:', () => {
  const store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  test('appCheckConnection() dispatches a true ONLINE_STATUS action', () => {
    const EXPECTED_ACTION = [{
      type: ONLINE_STATUS,
      payload: { status: true },
    }];
    appCheckConnection({}, store);

    expect(store.getActions()).toEqual(EXPECTED_ACTION);
  });
});
