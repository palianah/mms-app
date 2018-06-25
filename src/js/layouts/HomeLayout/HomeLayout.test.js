// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMockStore } from 'redux-test-utils';
import store from '../../storage/store';
import HomeLayout from './HomeLayout';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

describe('<HomeLayout />:', () => {
  const props = { token: 'letmein' };
  const history = { push: jest.fn() };
  let callCount = 0;

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><HomeLayout {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
