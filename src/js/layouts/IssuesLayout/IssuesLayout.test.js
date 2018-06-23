// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMockStore } from 'redux-test-utils';
import store from '../../storage/store';
import IssuesLayout from './IssuesLayout';
import { ROUTE_LOGIN } from '../../constants/routes';
import userDefault from '../../types/user';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });

describe('<IssuesLayout />:', () => {
  const props = {...userDefault, username: 'davelister', loggedin: true };
  const history = { push: jest.fn() };
  let callCount = 0;

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><IssuesLayout {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  // Don't add any tests that use callCount before this one!
  test('Should not redirect if logged in', () => {
    const notEmptyStore = createMockStore({
      user: {...props},
    });
    const wrapper = mount(
      <Provider store={notEmptyStore}>
        <IssuesLayout history={history} />
      </Provider>
    );
    expect(history.push.mock.calls.length).toBe(callCount);
  });

  test('Should redirect to ROUTE_LOGIN if not logged in', () => {
    const emptyStore = createMockStore({
      user: {...userDefault},
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
