// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssueListIssue from './IssueListIssue';
import issueDefault from '../../../types/issue';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

test('<IssueListIssue />: Renders without crashing', () => {
  const props = {
    history: { push: jest.fn() },
    issue: {...issueDefault},
    online: true,
  };
  const wrapper = shallow(<IssueListIssue {...props} />);
  expect(wrapper).toHaveLength(1);
});
