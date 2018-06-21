// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Translation from './Translation';
import './testData';

configure({ adapter: new Adapter() });

const windowApp = {...window.app};

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

  describe('Handles window.app correctly', () => {
    beforeEach(() => {
      window.app = {...windowApp};
    });

    test('Returns ?name:ns if translations undefined', () => {
      delete window.app.translations;
      const wrapper = shallow(<Translation name="Name" ns="App" />);
      expect(wrapper.text()).toBe('?Name:App');
    });
    
    test('Returns ?name:ns if the language is undefined in translations', () => {
      window.app.curLang = 'IT';
      const wrapper = shallow(<Translation name="Name" ns="App" />);
      expect(wrapper.text()).toBe('?Name:App');
    });

    test('Returns ?name:ns if the namespace is undefined', () => {
      const wrapper = shallow(<Translation name="Name" ns="Wrong" />);
      expect(wrapper.text()).toBe('?Name:Wrong');
    });

    test('Returns ?name:ns if the name is undefined', () => {
      const wrapper = shallow(<Translation name="Wrong" ns="App" />);
      expect(wrapper.text()).toBe('?Wrong:App');
    });
  });
});
