// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssueList from './IssueList';
import issueDefault from '../../types/issue';
import '../Translation/testData';

configure({ adapter: new Adapter() });

describe('<IssueList />', () => {
  const props = {
    history: {},
    issueCount: 1,
    issues: [{...issueDefault}],
  };
  const propsEmpty = {
    history: {},
    issueCount: 0,
    issues: [],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<IssueList {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Should render a list when there is at least 1 issue', () => {
    const wrapper = shallow(<IssueList {...props} />);
    expect(wrapper.find('.IssueList__List')).toHaveLength(1);
    const wrapperEmpty = shallow(<IssueList {...propsEmpty} />);
    expect(wrapperEmpty.find('.IssueList__List')).toHaveLength(0);
  });

  test('Should render the empty message when there is less than 1 issue', () => {
    const wrapper = shallow(<IssueList {...propsEmpty} />);
    expect(wrapper.find('.IssueList__List')).toHaveLength(0);
  });
});
