// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Avatar from './Avatar';
import Adapter from 'enzyme-adapter-react-16';
import '../Translation/testData';

configure({ adapter: new Adapter() });

describe('<Avatar />:', () => {
  test('Renders without crashing', () => {
    const props = {
      src: 'test.png',
      online: true,
    };
    const wrapper = shallow(<Avatar {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
