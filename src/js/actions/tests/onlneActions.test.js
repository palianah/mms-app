// @flow

import { setOnlineStatus } from '../onlineActions';
import { ONLINE_STATUS } from '../../constants/actionTypes';


/**
* Online Status Actions Tests
*/

describe('Actions: onlineActions', () => {
  test('ONLINE_STATUS is handled correctly', () => {
    const EXPECTED_ACTION = {
      type: ONLINE_STATUS,
      payload: { status: true },
    };
    const EXPECTED_ACTION_OFFLINE = {
      type: ONLINE_STATUS,
      payload: { status: false },
    };

    expect(setOnlineStatus(true)).toEqual(EXPECTED_ACTION);
    expect(setOnlineStatus(false)).toEqual(EXPECTED_ACTION_OFFLINE);
  });
});