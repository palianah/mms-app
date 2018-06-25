// @flow

import { GQL_ASC, GQL_DESC } from '../constants/gql';


/**
* Issues type def. (Info about issues - not the issues themselves)
*/

export type IssuesType = {
  endCursor: string,
  error: boolean,
  errorMsg: Array<string>,
  fetching: boolean,
  hasNextPage: boolean,
  perPage: number,
  sort: GQL_ASC | GQL_DESC,
  sortField: string,
  states: string,
  term: string,
  totalCount: number,
};

const issuesDefault = {
  endCursor: '',
  error: false,
  errorMsg: [],
  fetching: false,
  hasNextPage: false,
  perPage: 10,
  sort: GQL_DESC,
  sortField: 'created',
  states: 'open',
  term: '',
  totalCount: 0,
};

export default issuesDefault;