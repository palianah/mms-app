import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';
import { UI_ERROR_CLASS } from '../../../constants/ui';

configure({ adapter: new Adapter() });

describe('<Button />:', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
  });

  test('Handles disabled property', () => {
    const props = {
      onClick: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<Button {...props} />);
    wrapper.simulate('click')
    expect(props.onClick.mock.calls.length).toBe(0);
  });

  test('Handles busy property', () => {
    const props = {
      busy: true,
    };
    const wrapper = mount(<Button {...props} />);
    expect(wrapper.find('.icofont-refresh')).toHaveLength(1);
  });

  test('Handles className property', () => {
    const cn1Props = { className: '' };
    const cn1Wrapper = shallow(<Button {...cn1Props} />);
    const cn2Props = { className: 'TestClass' };
    const cn2Wrapper = shallow(<Button {...cn2Props} />);

    expect(cn1Wrapper.find('.Button').hasClass('TestClass')).toEqual(false);
    expect(cn2Wrapper.find('.Button').hasClass('TestClass')).toEqual(true);
  });

  test('Handles isValid property', () => {
    const iv1Props = { isValid: true };
    const iv1Wrapper = shallow(<Button {...iv1Props} />);
    const iv2Props = { isValid: false };
    const iv2Wrapper = shallow(<Button {...iv2Props} />);

    expect(iv1Wrapper.find('.Button').hasClass(UI_ERROR_CLASS)).toEqual(false);
    expect(iv2Wrapper.find('.Button').hasClass(UI_ERROR_CLASS)).toEqual(true);
  });
});
