// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssueList from './IssueList';
import '../Translation/testData';

configure({ adapter: new Adapter() });

test('<IssueList />: Renders without crashing', () => {
  const wrapper = shallow(<IssueList />);
  expect(wrapper).toHaveLength(1);
});
