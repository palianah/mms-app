// @flow

import { GQL_ASC, GQL_DESC } from '../constants/gql';


/**
* Issues type def. (Info about issues - not the issues themselves)
*/

export type IssuesType = {
  error: boolean,
  errorMsg: Array<string>,
  fetching: boolean,
  perPage: number,
  sort: GQL_ASC | GQL_DESC,
  sortField: string,
  states: string,
  term: string,
  totalCount: number,
};

const issuesDefault = {
  error: false,
  errorMsg: [],
  fetching: false,
  perPage: 10,
  sort: GQL_DESC,
  sortField: 'created',
  states: 'open',
  term: '',
  totalCount: 0,
};

export default issuesDefault;