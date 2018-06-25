// @flow

import tokenSchema, { tokenMatch } from './token';

/**
* Token YUP Schema Tests
*/

describe('Validation: YUP Schema: Token', () => {
  test('tokenMatch should only contain lowercase letters and numers', () => {
    expect(tokenMatch.test('qwertz12345')).toBe(true);
    expect(tokenMatch.test(' qwertz12345 ')).toBe(false);
    expect(tokenMatch.test('qwertz 12345')).toBe(false);
    expect(tokenMatch.test('QWERrtz 12345')).toBe(false);
    expect(tokenMatch.test('qwertz12345!"§$%')).toBe(false);
  });

  test('Token is correctly transformed', () => {
    const TEST_TOKEN = ' QWERrtz 12345 ';
    const EXPECTED_TOKEN =  'qwerrtz12345';

    expect.assertions(1);
    return expect(tokenSchema.validate(TEST_TOKEN)).resolves.toEqual(EXPECTED_TOKEN);
  });
});
