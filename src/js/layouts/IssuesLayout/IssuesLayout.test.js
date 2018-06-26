// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMockStore } from 'redux-test-utils';
import store from '../../storage/reduxStore';
import IssuesLayout from './IssuesLayout';
import userDefault from '../../types/user';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

describe('<IssuesLayout />', () => {
  const props = { loggedin: true };
  const history = { push: jest.fn() };
  let callCount = 0;

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><IssuesLayout {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
