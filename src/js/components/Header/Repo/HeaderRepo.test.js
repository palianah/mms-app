// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderRepo from './HeaderRepo';

configure({ adapter: new Adapter() });

describe('<HeaderRepo />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<HeaderRepo />);
    expect(wrapper).toHaveLength(1);
  });

  test('Displays the corrct repo', () => {
    const props = { repo: 'Test' };
    const wrapper = shallow(<HeaderRepo {...props}/>);
    expect(wrapper.text()).toEqual(props.repo);
  });
});
