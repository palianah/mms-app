// @flow

import store from '../storage/reduxStore';
import { setOnlineStatus } from '../actions/onlineActions';


/**
 * Method to indicate to the user that the app is offline
 */
export function appCheckConnection(event: Object, storeReq: Object) {
  const dispatcher = storeReq || store;
  dispatcher.dispatch(setOnlineStatus(navigator.onLine));
}

/**
 * Listen for changes to connectivity.
 */
window.addEventListener('load', function(event: Object) {
  window.addEventListener('online',  appCheckConnection);
  window.addEventListener('offline', appCheckConnection);
  appCheckConnection(event);
});