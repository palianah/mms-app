// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InfoMsg from './InfoMsg';

configure({ adapter: new Adapter() });

test('<InfoMsg />: Renders without crashing', () => {
  const props = { msg: 'Information...' }
  const wrapper = shallow(<InfoMsg {...props} />);
  expect(wrapper).toHaveLength(1);
});
