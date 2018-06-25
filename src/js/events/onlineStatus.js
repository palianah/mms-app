// @flow

import store from '../storage/store';
import { ONLINE_STATUS } from '../constants/actionTypes';
import { setOnlineStatus } from '../actions/onlineActions';


/**
 * Method to indicate to the user that the app is offline
 */
export function appCheckConnection(event: Object) {
    store.dispatch(setOnlineStatus(navigator.onLine));
}

/**
 * Listen for changes to connectivity.
 */
window.addEventListener('load', function(event: Object) {
  window.addEventListener('online',  appCheckConnection);
  window.addEventListener('offline', appCheckConnection);
  appCheckConnection(event);
});