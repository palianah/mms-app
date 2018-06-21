// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssueListInfo from './IssueListInfo';

configure({ adapter: new Adapter() });

test('<IssueListInfo />: Renders without crashing', () => {
  const props = { msg: 'Information...' }
  const wrapper = shallow(<IssueListInfo {...props} />);
  expect(wrapper).toHaveLength(1);
});
