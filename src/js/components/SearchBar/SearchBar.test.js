// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from './SearchBar';
import '../Translation/testData';

configure({ adapter: new Adapter() });

test('<SearchBar />: Renders without crashing', () => {
  const wrapper = shallow(<SearchBar />);
  expect(wrapper).toHaveLength(1);
});
