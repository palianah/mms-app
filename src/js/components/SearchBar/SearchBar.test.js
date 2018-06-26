// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../storage/reduxStore';
import WrappedSearchBar, { SearchBar } from './SearchBar';
import issuesDefault from '../../types/issues';
import { GQL_ASC, GQL_DESC } from '../../constants/gql';
import '../Translation/testData';

configure({ adapter: new Adapter() });

describe('<SearchBar />', () => {
  const props = {
    dispatch: jest.fn(),
    fetching: true,
    initialSort: '',
    initialTerm: '',
    searchIssues: jest.fn(),
  };
  const propsFetching = {...props, fetching: true };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><WrappedSearchBar {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  test('When fetching the form fields are disabled', () => {
    const wrapper = mount(<Provider store={store}><WrappedSearchBar {...props} /></Provider>);
    expect(wrapper.find('.TextInput').prop('disabled')).toBe(true);
    expect(wrapper.find('.Button').at(0).prop('disabled')).toBe(true);
    expect(wrapper.find('.Button').at(1).prop('disabled')).toBe(true);
  });

  test('When NOT fetching the form fields are not disabled', () => {
    const wrapper = mount(<Provider store={store}><WrappedSearchBar {...propsFetching} /></Provider>);
    expect(wrapper.find('.TextInput').prop('disabled')).toBe(true);
    expect(wrapper.find('.Button').at(0).prop('disabled')).toBe(true);
    expect(wrapper.find('.Button').at(1).prop('disabled')).toBe(true);
  });

  test('submitSearch calls searchIssues with the correct arguments', () => {
    const wrapper = shallow(<SearchBar store={store} {...props} />);
    const instance = wrapper.instance();
    instance.submitSearch('test', GQL_ASC);
    expect(props.searchIssues.mock.calls.length).toBe(1);
    expect(props.searchIssues.mock.calls[0][0]).toBe('test');
    expect(props.searchIssues.mock.calls[0][1]).toBe(GQL_ASC);
  });

  describe('validateSearch()', () => {
    const wrapper = shallow(<SearchBar store={store} {...props} />);
    const instance = wrapper.instance();

    test('Throws "search-invalid" if the search term is invalid', () => {
      expect(() => {
        instance.validateSearch(null);
      }).toThrow('search-invalid');
    });

    test('Sets state with the term if it is valid', () => {
      const term = 'The Cat';
      instance.validateSearch(term);
      expect(wrapper.state().term).toEqual(term);
      expect(() => {
        instance.validateSearch(term);
      }).not.toThrow('search-invalid');
    });
  });

  describe('Direction buttons:', () => {
    const term = 'cat';
    const newSearchIssues = jest.fn();
    const wrapper = shallow(<SearchBar store={store} {...props} searchIssues={newSearchIssues} initialTerm={term} />);
    const instance = wrapper.instance();

    test('handleClickAsc() sets sort in the state', () => {
      instance.handleClickAsc({});
      expect(wrapper.state().sort).toEqual(GQL_ASC);
      expect(newSearchIssues.mock.calls.length).toBe(1);
      expect(newSearchIssues.mock.calls[0][0]).toBe(term);
      expect(newSearchIssues.mock.calls[0][1]).toBe(GQL_ASC);
    });

    test('handleClickDesc() sets sort in the state', () => {
      instance.handleClickDesc({});
      expect(wrapper.state().sort).toEqual(GQL_DESC);
      expect(newSearchIssues.mock.calls.length).toBe(2);
      expect(newSearchIssues.mock.calls[1][0]).toBe(term);
      expect(newSearchIssues.mock.calls[1][1]).toBe(GQL_DESC);
    });
  });

  describe('handleOnKeyUp()', () => {
    const term = 'lister';
    const newSearchIssues = jest.fn();
    const wrapper = shallow(<SearchBar store={store} {...props} searchIssues={newSearchIssues} initialTerm={term} initialSort={GQL_ASC} />);
    const instance = wrapper.instance();

    test('Escape clears the term', () => {
      instance.handleOnKeyUp({ key: 'Escape', currentTarget: { value: 'rimmer'}});
      expect(wrapper.state().term).toEqual('');
      expect(newSearchIssues.mock.calls.length).toBe(1);
      expect(newSearchIssues.mock.calls[0][0]).toBe('');
      expect(newSearchIssues.mock.calls[0][1]).toBe(GQL_ASC);
    });

    test('Delete clears the term', () => {
      instance.handleOnKeyUp({ key: 'Delete', currentTarget: { value: 'rimmer'}});
      expect(wrapper.state().term).toEqual('');
      expect(newSearchIssues.mock.calls.length).toBe(2);
      expect(newSearchIssues.mock.calls[1][0]).toBe('');
      expect(newSearchIssues.mock.calls[1][1]).toBe(GQL_ASC);
    });

    test('Enter submits the search', () => {
      instance.handleOnKeyUp({ key: 'Enter', currentTarget: { value: 'rimmer'}});
      expect(wrapper.state().term).toEqual('rimmer');
      expect(newSearchIssues.mock.calls.length).toBe(3);
      expect(newSearchIssues.mock.calls[2][0]).toBe('rimmer');
      expect(newSearchIssues.mock.calls[2][1]).toBe(GQL_ASC);
    });
  });

  test('handleSearchChange() calls validateSearch()', () => {
    const spy = jest.spyOn(SearchBar.prototype, 'validateSearch');
    const term = 'lister';
    const newSearchIssues = jest.fn();
    const wrapper = shallow(<SearchBar store={store} {...props} searchIssues={newSearchIssues} initialTerm={term} initialSort={GQL_ASC} />);
    const instance = wrapper.instance();
    instance.handleSearchChange({ currentTarget: { value: 'arnold'}});
    expect(spy).toHaveBeenCalledWith('arnold');
  });
});