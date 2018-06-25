// @flow

import { ONLINE_STATUS, USER_LOGOUT } from '../constants/actionTypes';
import { DUMMY_USER } from '../constants/misc';


/**
* Onlne Status Middlewear. 
* 
* If a user is logged in and the browser comes back online we need to log them out
* if they were logged in as the DUMMY_USER user.
*/
const checkOnlineStatus = (store: Object) => (next: Function) => (action: Object) => {
    if (action.type === ONLINE_STATUS && action.payload.status === true) {
        const { username } = store.getState().user;
        if (username === DUMMY_USER) store.dispatch({ type: USER_LOGOUT });
    }
    return next(action); // Send on so that ONLINE_STATUS is received by the reducers.
}

export default checkOnlineStatus;