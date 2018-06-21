// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderRepo from './HeaderRepo';

configure({ adapter: new Adapter() });

describe('<HeaderRepo />', () => {
  const props = { repoName: 'Test' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<HeaderRepo {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Displays the corrct repo', () => {
    const wrapper = shallow(<HeaderRepo {...props} />);
    expect(wrapper.text()).toEqual(props.repoName);
  });
});
