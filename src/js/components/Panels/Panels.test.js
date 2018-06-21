// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../store/store';
import Panels from './Panels';
import '../Translation/testData';

configure({ adapter: new Adapter() });

describe('<Panels />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><Panels /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
