// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomeLayout from './HomeLayout';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

test('<HomeLayout />: Renders without crashing', () => {
  const wrapper = shallow(<HomeLayout />);
  expect(wrapper).toHaveLength(1);
});
