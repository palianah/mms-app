// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMockStore } from 'redux-test-utils';
import store from '../../storage/store';
import IssuesLayout from './IssuesLayout';
import { ROUTE_LOGIN } from '../../constants/routes';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

describe('<IssuesLayout />:', () => {
  const props = { token: 'letmein' };
  const history = { push: jest.fn() };
  let callCount = 0;

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><IssuesLayout {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  // Don't add any tests that use callCount before this one!
  test('Should not redirect if token is NOT empty', () => {
    const notEmptyStore = createMockStore(props);
    const wrapper = mount(
      <Provider store={notEmptyStore}>
        <IssuesLayout history={history} />
      </Provider>
    );
    expect(history.push.mock.calls.length).toBe(callCount);
  });

  test('Should redirect to ROUTE_LOGIN if token empty', () => {
    const emptyStore = createMockStore({
      token: '',
    });
    const wrapper = mount(
      <Provider store={emptyStore}>
        <IssuesLayout history={history} />
      </Provider>
    );
    callCount ++;
    expect(history.push.mock.calls.length).toBe(callCount);
    expect(history.push.mock.calls[callCount - 1][0]).toBe(ROUTE_LOGIN);
  });
});
