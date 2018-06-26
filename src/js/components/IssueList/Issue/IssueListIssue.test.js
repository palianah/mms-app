// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssueListIssue from './IssueListIssue';
import issueDefault from '../../../types/issue';
import { ROUTE_ISSUE } from '../../../constants/routes';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

describe('<IssueListIssue />', () => {
  const props = {
    history: { push: jest.fn() },
    issue: {...issueDefault},
    online: true,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<IssueListIssue {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('History is pushed with correct URL', () => {
    const wrapper = shallow(<IssueListIssue {...props} />);
    wrapper.instance().handleClick({}, 12);
    expect(props.history.push.mock.calls.length).toBe(1);
    expect(props.history.push.mock.calls[0][0]).toBe(ROUTE_ISSUE.replace(':issueId', 12));
  });
});
