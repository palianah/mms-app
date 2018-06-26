// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../storage/reduxStore';
import Panels from './Panels';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';
import IssuesLayout from '../../layouts/IssuesLayout/IssuesLayout';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'
import NotFoundLayout from '../../layouts/NotFoundLayout/NotFoundLayout';
import {
  ROUTE_HOME,
  ROUTE_ISSUES,
  ROUTE_LOGIN,
} from '../../constants/routes';
import '../Translation/testData';

configure({ adapter: new Adapter() });

describe('<Panels />', () => {
  const props = {
    history: { push: () => jest.fn()},
    loggedin: true,
    location: {},
    match: {},
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Panels {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  // TODO: Clean up the following to describes... maybe iterate over an object to produce the expects?
  describe('If logged in:', () => {
    test('An unknown route shows NotFoundLayout', () => {
      const wrapper = mount(
        <Provider store={store} >
          <MemoryRouter initialEntries={[ '/nonexistent' ]}>
            <Panels {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(HomeLayout)).toHaveLength(0);
      expect(wrapper.find(IssuesLayout)).toHaveLength(0);
      expect(wrapper.find(LoginLayout)).toHaveLength(0); 
      expect(wrapper.find(NotFoundLayout)).toHaveLength(1);
    });

    test('ROUTE_ISSUES shows IssuesLayout', () => {
      const wrapper = mount(
        <Provider store={store} >
          <MemoryRouter initialEntries={[ ROUTE_ISSUES ]}>
            <Panels {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(HomeLayout)).toHaveLength(0);
      expect(wrapper.find(IssuesLayout)).toHaveLength(1);
      expect(wrapper.find(LoginLayout)).toHaveLength(0); 
      expect(wrapper.find(NotFoundLayout)).toHaveLength(0);
      wrapper.unmount();
    });

    test('ROUTE_HOME shows HomeLayout', () => {
      const wrapper = mount(
        <Provider store={store} >
          <MemoryRouter initialEntries={[ ROUTE_HOME ]}>
            <Panels {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(HomeLayout)).toHaveLength(1);
      expect(wrapper.find(IssuesLayout)).toHaveLength(0);
      expect(wrapper.find(LoginLayout)).toHaveLength(0); 
      expect(wrapper.find(NotFoundLayout)).toHaveLength(0);
      wrapper.unmount();
    });

    test('ROUTE_LOGIN shows LoginLayout', () => {
      const wrapper = mount(
        <Provider store={store} >
          <MemoryRouter initialEntries={[ ROUTE_LOGIN ]}>
            <Panels {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(HomeLayout)).toHaveLength(0);
      expect(wrapper.find(IssuesLayout)).toHaveLength(0);
      expect(wrapper.find(LoginLayout)).toHaveLength(1); 
      expect(wrapper.find(NotFoundLayout)).toHaveLength(0);
      wrapper.unmount();
    });
  });

  describe('If logged out:', () => {
    test('An unknown route shows LoginLayout', () => {
      const wrapper = mount(
        <Provider store={store} >
          <MemoryRouter initialEntries={[ '/nonexistent' ]}>
            <Panels {...props} loggedin={false} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(LoginLayout)).toHaveLength(1);
      wrapper.unmount();
    });

    test('ROUTE_ISSUES shows LoginLayout', () => {
      const wrapper = mount(
        <Provider store={store} >
          <MemoryRouter initialEntries={[ ROUTE_ISSUES ]}>
            <Panels {...props} loggedin={false} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(LoginLayout)).toHaveLength(1);
      wrapper.unmount();
    });

    test('ROUTE_HOME shows LoginLayout', () => {
      const wrapper = mount(
        <Provider store={store} >
          <MemoryRouter initialEntries={[ ROUTE_HOME ]}>
            <Panels {...props} loggedin={false} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(LoginLayout)).toHaveLength(1);
      wrapper.unmount();
    });

    test('ROUTE_LOGIN shows LoginLayout', () => {
      const wrapper = mount(
        <Provider store={store} >
          <MemoryRouter initialEntries={[ ROUTE_LOGIN ]}>
            <Panels {...props} loggedin={false} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(LoginLayout)).toHaveLength(1);
      wrapper.unmount();
    });
  });
});
