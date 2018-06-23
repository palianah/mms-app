// @flow

import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { createMockStore } from 'redux-test-utils';
import store from '../../store/store';
import ConnectedLoginLayout, { LoginLayout } from './LoginLayout';
import * as tokenActions from '../../actions/tokenActions';
import { TOKEN_SET } from '../../constants/actionTypes';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

describe('<LoginLayout />:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const propsRouter = { 
    history: jest.fn(), 
    location: jest.fn(), 
    match: jest.fn(), 
  };
  const props = {
    ...propsRouter,
    dispatch: jest.fn(), 
    dispatchToken: jest.fn(), 
    initialToken: 'letmein',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<LoginLayout {...props} store={store} />);
    expect(wrapper).toHaveLength(1);
  });

  test('dispatchToken() should call tokenActions.set() ', () => {
    const newVal = 'newval';
    const fakeStore = mockStore({
      token: 'initval',
    });
    const wrapper = mount(
      <Provider store={fakeStore}>
        <ConnectedLoginLayout />
      </Provider>
    );
    const wrapperInput = wrapper.find('input');
    wrapperInput.instance().value = newVal;
    wrapperInput.simulate('change');
    wrapperInput.simulate('keyUp', { key: 'Enter' });

    const actions = fakeStore.getActions();
    const expectedAction = { type: TOKEN_SET, payload: { token: newVal } };
    expect(actions).toEqual([expectedAction]);
  });
  
  describe('handleOnKeyUp():', () => {
    test('Should not change state if wrong key pressed or input is empty', () => {
      const wrapper = mount(<LoginLayout {...props} initialToken="" store={store} />);
      const wrapperInput = wrapper.find('input');

      wrapperInput.simulate('keyUp', { key: 'a' });
      expect(props.dispatchToken.mock.calls.length).toBe(0);
      wrapperInput.simulate('keyUp', { key: 'Enter' });
      expect(props.dispatchToken.mock.calls.length).toBe(0);
      expect(wrapper.state().step).toBe('default');
      expect(wrapper.state().token).toBe('');
    });

    test('Should change state if enter pressed & input is not empty', () => {
      const wrapper = mount(<LoginLayout {...props} store={store} />);
      const wrapperInput = wrapper.find('input');

      wrapperInput.simulate('keyUp', { key: 'a' });
      expect(props.dispatchToken.mock.calls.length).toBe(0);
      wrapperInput.simulate('keyUp', { key: 'Enter' });
      expect(props.dispatchToken.mock.calls.length).toBe(1);
      expect(wrapper.state().step).toBe('checking');
      expect(wrapper.state().token).toBe(props.initialToken);
    });
  });
  
  describe('handleOnChange():', () => {
    test('Removes white space from the token', () => {
      const wrapper = mount(<LoginLayout {...props} initialToken="" store={store} />);
      const wrapperInput = wrapper.find('input');

      wrapperInput.instance().value = 'test';
      wrapperInput.simulate('change');
      expect(wrapper.state().token).toBe('test');
      
      wrapperInput.instance().value = ' Test with whitespace ';
      wrapperInput.simulate('change');
      expect(wrapper.state().token).toBe('testwithwhitespace');
    });
  });
});
