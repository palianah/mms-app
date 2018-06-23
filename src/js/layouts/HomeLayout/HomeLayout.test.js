// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMockStore } from 'redux-test-utils';
import store from '../../store/store';
import HomeLayout from './HomeLayout';
import { ROUTE_ISSUES, ROUTE_LOGIN } from '../../constants/routes';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

describe('<HomeLayout />:', () => {
  const props = { token: 'letmein' };
  const history = { push: jest.fn() };
  let callCount = 0;

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><HomeLayout {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  test('Should redirect to ROUTE_LOGIN if token empty', () => {
    const emptyStore = createMockStore({
      token: '',
    });
    const wrapper = mount(
      <Provider store={emptyStore}>
        <HomeLayout history={history} />
      </Provider>
    );
    callCount ++;
    expect(history.push.mock.calls.length).toBe(callCount);
    expect(history.push.mock.calls[callCount - 1][0]).toBe(ROUTE_LOGIN);
  });

  test('Should redirect to ROUTE_ISSUES if token NOT empty', () => {
    const notEmptyStore = createMockStore(props);
    const wrapper = mount(
      <Provider store={notEmptyStore}>
        <HomeLayout history={history} />
      </Provider>
    );
    callCount ++;
    expect(history.push.mock.calls.length).toBe(callCount);
    expect(history.push.mock.calls[callCount - 1][0]).toBe(ROUTE_ISSUES);
  });
});
