// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Avatar from './Avatar';
import Adapter from 'enzyme-adapter-react-16';
import '../Translation/testData';

configure({ adapter: new Adapter() });

describe('<Avatar />', () => {
  const props = {
    src: 'test.png',
    online: true,
  };

  const propsOffline = {
    src: 'test.png',
    online: false,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Avatar {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('When offline, renders an image tag without a ref attribute', () => {
    const spy = jest.spyOn(Avatar.prototype, 'renderImg');
    const wrapper = shallow(<Avatar {...propsOffline} />);
    expect(spy).toHaveBeenCalled();
  });

  test('When online, renders an image tag with a ref attribute', () => {
    const spy = jest.spyOn(Avatar.prototype, 'renderObserver');
    const wrapper = shallow(<Avatar {...props} />);
    expect(spy).toHaveBeenCalled();
  });
});
