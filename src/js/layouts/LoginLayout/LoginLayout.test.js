// @flow

import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { createMockStore } from 'redux-test-utils';
import store from '../../storage/reduxStore';
import ConnectedLoginLayout, { LoginLayout } from './LoginLayout';
import {
  loginUser,
  logoutUser,
} from '../../actions/userActions';
import {
  USER_LOGOUT,
  USER_LOGIN,
} from '../../constants/actionTypes';
import userDefault from '../../types/user';
import { ROUTE_ISSUES } from '../../constants/routes';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

describe('<LoginLayout />', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const propsRouter = { 
    history: jest.fn(), 
    location: jest.fn(), 
    match: jest.fn(), 
  };
  const props = {
    ...propsRouter,
    online: true,
    dispatch: jest.fn(),
    loginUser: jest.fn(),
    initialToken: 'letmein',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<LoginLayout {...props} store={store} />);
    expect(wrapper).toHaveLength(1);
  });

  test('setUser() should call userActions.setUser() ', () => {
    const initToken = 'letmein';
    const newUser = {...userDefault, username: 'davelister', token: initToken };
    const fakeData = { viewer: { login: newUser.username } };
    const history = { push: jest.fn() };
    const fakeStore = mockStore({
      user: {...userDefault, token: initToken},
    });
    const wrapper = mount(
      <Provider store={fakeStore}>
        <ConnectedLoginLayout history={history} />
      </Provider>
    );
    const component = wrapper.find(LoginLayout);
    component.instance().tokenOk(fakeData);
    
    const actions = fakeStore.getActions();
    const expectedAction = { type: USER_LOGIN, payload: newUser };
    expect(actions).toEqual([expectedAction]);
    expect(history.push.mock.calls.length).toBe(1);
    expect(history.push.mock.calls[0][0]).toBe(ROUTE_ISSUES);
  });
  
  describe.skip('handleOnKeyUp():', () => {
    test('Should change state if enter pressed & input is not empty', () => {
      const wrapper = mount(<LoginLayout {...props} store={store} />);
      const wrapperInput = wrapper.find('input');

      wrapperInput.simulate('keyUp', { key: 'Enter' });
      expect(wrapper.state().step).toBe('checking');
      expect(wrapper.state().token).toBe(props.initialToken);
    });

    test('Should not change state if enter pressed & input is empty', () => {
      const wrapper = mount(<LoginLayout {...props} initialToken="" store={store} />);
      const wrapperInput = wrapper.find('input');

      wrapperInput.simulate('change', { target: { value: '' } });
      wrapperInput.simulate('keyUp', { key: 'Enter' });
      expect(wrapper.state().step).toBe('default');
      expect(wrapper.state().token).toBe('');
    });

    test('Should escape and delete appropriately', () => {
      const wrapper = mount(<LoginLayout {...props} store={store} />);
      const wrapperInput = wrapper.find('input');

      expect(wrapper.state().token).toBe(props.initialToken);
      wrapperInput.simulate('keyUp', { key: 'Escape' });
      expect(wrapper.state().token).toBe('');
      wrapperInput.instance().value = 'thecat';
      wrapperInput.simulate('change');
      expect(wrapper.state().token).toBe('thecat');
      wrapperInput.simulate('keyUp', { key: 'Delete' });
      expect(wrapper.state().token).toBe('');
    });
  });
  
  describe.skip('handleOnChange():', () => {
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

  // TODO: Fix if time
  test.skip('checkToken() calls tokenOk()', () => {
    const dummyResponse = { data: { viewer: { login: 'Kryten'}}};
    const gqlRequester = jest.fn(
      () => {
        return new Promise((resolve, reject) => {
          console.log('RETURNING FROM MOCK');
          resolve({ data: dummyResponse });
        });
      }
    );
    const wrapper = shallow(<LoginLayout {...props} store={store} />);
    wrapper.instance().tokenOk = jest.fn();
    wrapper.update();
    wrapper.instance().checkToken(gqlRequester);
    expect.assertions(2);
    expect(gqlRequester.mock.calls.length).toBe(1);
    expect(wrapper.instance().tokenOk.mock.calls.length).toBe(1);
  });
});
