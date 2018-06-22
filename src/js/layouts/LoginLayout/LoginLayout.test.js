// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMockStore } from 'redux-test-utils';
import store from '../../store/store';
import LoginLayout from './LoginLayout';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

describe('<LoginLayout />:', () => {
  test('Renders without crashing', () => {
    const props = { token: 'letmein' };
    const wrapper = shallow(<Provider store={store}><LoginLayout {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
