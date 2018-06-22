// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssuesLayout from './IssuesLayout';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

test('<IssuesLayout />: Renders without crashing', () => {
  const wrapper = shallow(<IssuesLayout />);
  expect(wrapper).toHaveLength(1);
});
