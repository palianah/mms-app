// @flow

import checkOnlineStatus from './checkOnlineStatus';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ONLINE_STATUS, USER_LOGOUT } from '../constants/actionTypes';
import { DUMMY_USER } from '../constants/misc';
import { setOnlineStatus } from '../actions/onlineActions';

const middlewares = [thunk, checkOnlineStatus]
const mockStore = configureMockStore(middlewares);

/**
* checkOnlineStatus MW Tests
*/

describe('Middlewear: checkOnlineStatus', () => {
    const store = mockStore({ user: { username: '' }});

    test('When false the ONLINE_STATUS event only triggers 1 action', () => {
        const expectedActions = [{
            type: ONLINE_STATUS,
            payload: { status: false },
        }];

        expect.assertions(1);
        store.dispatch(setOnlineStatus(false));
        expect(store.getActions()).toEqual(expectedActions);
        store.clearActions();
    });

    test('When true the ONLINE_STATUS event triggers 1 actions if the user is not DUMMY_USER', () => {
        const expectedActions = [{
            type: ONLINE_STATUS,
            payload: { status: true },
        }];

        expect.assertions(1);
        store.dispatch(setOnlineStatus(true));
        expect(store.getActions()).toEqual(expectedActions);
        store.clearActions();
    });

    test('When true the ONLINE_STATUS event triggers 2 actions if the user is DUMMY_USER and logs the user out', () => {
        const store = mockStore({ user: { username: DUMMY_USER }});
        const expectedActions = [
            { type: USER_LOGOUT },
            {
                type: ONLINE_STATUS,
                payload: { status: true },
            },
        ];

        expect.assertions(1);
        store.dispatch(setOnlineStatus(true));
        expect(store.getActions()).toEqual(expectedActions);
        store.clearActions();
    });
});
