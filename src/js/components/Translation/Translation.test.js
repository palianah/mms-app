// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Translation from './Translation';
import './testData';

configure({ adapter: new Adapter() });

describe('<Translation />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Translation name="Name" ns="App" />, div);
  });

  test('Renders the correct translation', () => {
    const wrapper = shallow(<Translation name="Name" ns="App" />);
    expect(wrapper.text()).toBe(window.app.translations.EN.App.Name);
  });

  test('Handles Language change', () => {
    const wrapper = mount(<Translation name="Name" ns="App" />);
    expect(wrapper.text()).toBe(window.app.translations.EN.App.Name);
    window.app.curLang = 'DE';
    wrapper.instance().forceUpdate();
    expect(wrapper.text()).toBe(window.app.translations.DE.App.Name);
    window.app.curLang = 'EN';
  });
});
