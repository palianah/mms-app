// @flow

import searchSchema from './search';

/**
* Token YUP Schema Tests
*/

describe('Validation: YUP Schema: Search', () => {
  test('search is correctly transformed', () => {
    const TEST_SEARCH = ' QWERrtz <b><script>alert()</script>{}12345 ';
    const EXPECTED_SEARCH =  ' QWERrtz bscriptalert()/script12345 ';

    expect.assertions(1);
    return expect(searchSchema.validate(TEST_SEARCH)).resolves.toEqual(EXPECTED_SEARCH);
  });
});
