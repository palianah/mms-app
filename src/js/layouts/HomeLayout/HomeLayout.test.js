// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../store/store';
import HomeLayout from './HomeLayout';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

test('<HomeLayout />: Renders without crashing', () => {
  const props = { token: 'letmein' };
  const wrapper = shallow(<Provider store={store}><HomeLayout {...props} /></Provider>);
  expect(wrapper).toHaveLength(1);
});
