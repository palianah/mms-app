// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../storage/reduxStore';
import SearchBar from './SearchBar';
import issuesDefault from '../../types/issues';
import '../Translation/testData';

configure({ adapter: new Adapter() });

test('<SearchBar />: Renders without crashing', () => {
  const props = {
    initialSort: '',
    initialTerm: '',
    searchIssues: jest.fn(),
  };

  const wrapper = shallow(<Provider store={store}><SearchBar {...props} /></Provider>);
  expect(wrapper).toHaveLength(1);
});
