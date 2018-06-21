// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from './SearchBar';
import store from '../../store/store';
import '../Translation/testData';

configure({ adapter: new Adapter() });

test('<SearchBar />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><SearchBar /></Provider>);
  expect(wrapper).toHaveLength(1);
});
