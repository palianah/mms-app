// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssueListCount from './IssueListCount';
import issueDefault from '../../../types/issue';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

test('<IssueListCount />: Renders without crashing', () => {
  const props = {
    matchCount: 2,
    repoName: 'React',
    repoOwner: 'Facebook',
    totalCount: 10,
  };
  const wrapper = shallow(<IssueListCount {...props} />);
  expect(wrapper).toHaveLength(1);
});
