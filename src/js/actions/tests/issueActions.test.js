// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchIssues,
  fetchIssuesError,
  fetchIssuesSuccess,
  fetchIssuesSuccessCache,
  searchIssues,
} from '../issueActions';
import {
  ISSUES_FETCH,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_SUCCESS,
  ISSUES_FETCH_SUCCESS_CACHE,
  ISSUES_SEARCH,
} from '../../constants/actionTypes';
import { GQL_ASC } from '../../constants/gql';
import IssuesDefault from '../../types/issues';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);


/**
* Issue Actions Tests
*/

describe('Actions: issueActions', () => {
  test('fetchIssuesError() returns the correct ISSUES_FETCH_ERROR action', () => {
    const EXPECTED_ACTION = {
      type: ISSUES_FETCH_ERROR,
      error: true,
      payload: {},
    };

    expect(fetchIssuesError({})).toEqual(EXPECTED_ACTION);
  });

  test('fetchIssuesSuccessCache() returns the correct ISSUES_FETCH_SUCCESS_CACHE action', () => {
    const EXPECTED_ACTION = {
      type: ISSUES_FETCH_SUCCESS_CACHE,
      payload: { data: [] },
      meta: { issues: {...IssuesDefault} },
    };

    expect(fetchIssuesSuccessCache([], {...IssuesDefault})).toEqual(EXPECTED_ACTION);
  });

  test('fetchIssuesSuccess() returns the correct ISSUES_FETCH_SUCCESS action', () => {
    const EXPECTED_ACTION = {
      type: ISSUES_FETCH_SUCCESS,
      payload: {},
      meta: { issues: {...IssuesDefault} },
    };

    expect(fetchIssuesSuccess({}, {...IssuesDefault})).toEqual(EXPECTED_ACTION);
  });

    // Messy... refactor later if time!
  describe('fetchIssues()', () => {
    const store = mockStore({});
    const mockConfig =  {
      repoName: '',
      repoOwner: '',
      sort: '',
      sortField: '',
      states: '',
      token: '',
    };
    const mockAxios = {
      get: jest.fn(() => Promise.resolve({ data: {}})),
    };
    const mockAxiosError = {
      get: jest.fn(() => Promise.reject({})),
    };
    const mockAxiosErrorServer = {
      get: jest.fn(() => Promise.resolve({ data: { errors: {}}})),
    };
    const mockGqlQuery = async (queryStr: string, token: string) => {
      const result = await mockAxios.get();
      return result;
    };
    const mockGqlQueryError = async (queryStr: string, token: string) => {
      const result = await mockAxiosError.get();
      return result;
    };
    const mockGqlQueryErrorServer = async (queryStr: string, token: string) => {
      const result = await mockAxiosErrorServer.get();
      return result;
    };

    test('Dispatches on success ISSUES_FETCH && ISSUES_FETCH_SUCCESS actions', () => {
      const expectedActions = [
        { type: ISSUES_FETCH },
        { type: ISSUES_FETCH_SUCCESS, payload: {} },
      ];

      expect.assertions(1);
      store.dispatch(fetchIssues(mockGqlQuery, mockConfig, {...IssuesDefault})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        store.clearActions();
      })
    });

    test('Dispatches on errors ISSUES_FETCH && ISSUES_FETCH_ERROR actions', () => {
      const expectedActions = [
        { type: ISSUES_FETCH },
        { type: ISSUES_FETCH_ERROR, payload: {}, error: true },
      ];

      expect.assertions(1);
      store.dispatch(fetchIssues(mockGqlQueryError, mockConfig, {...IssuesDefault})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        store.clearActions();
      });
    });

    test('Dispatches on serverside errors ISSUES_FETCH && ISSUES_FETCH_ERROR actions', () => {
      const expectedActions = [
        { type: ISSUES_FETCH },
        { type: ISSUES_FETCH_ERROR, payload: {}, error: true },
      ];

      expect.assertions(1);
      store.dispatch(fetchIssues(mockGqlQueryErrorServer, mockConfig, {...IssuesDefault})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        store.clearActions();
      });

    });
  });

  test('searchIssues() should set the term', () => {
    const searchTerm = 'Test';
    const EXPECTED_ACTION = {
      type: ISSUES_SEARCH,
      payload: { term: searchTerm, sort: GQL_ASC },
    };

    expect(searchIssues(searchTerm, GQL_ASC)).toEqual(EXPECTED_ACTION);
  });
});