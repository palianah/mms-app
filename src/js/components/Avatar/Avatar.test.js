// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Avatar from './Avatar';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Avatar />:', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<Avatar src="test.png" />);
    expect(wrapper).toHaveLength(1);
  });
});
