// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderLogout from './HeaderLogout';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

describe('<HeaderLogout />', () => {
  test('Renders without crashing', () => {
    const props = {
      onClick: jest.fn(),
    };
    const wrapper = shallow(<HeaderLogout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
