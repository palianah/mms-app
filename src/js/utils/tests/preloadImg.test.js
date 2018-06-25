// @flow

import { preloadImg } from '../preloadImg';


/**
* preloadImg Tests
* 
* @todo Find a way get the image onerror to fire.
*/

describe('Util: preloadImg', () => {
  test('preloadImg() should reject when the image errors', () => {
    expect.assertions(1);
    preloadImg('non_existent.jpg')
      .then(response => {
        expect(response).toEqual({ path: 'non_existent.jpg', error: false });
      })
      .catch(error => {
      });
  });
});
