// @flow


/**
* Issues type def. (Info about issues - not the issues themselves)
*/

export type IssuesType = {
  error: boolean,
  errorMsg: Array<string>,
  fetching: boolean,
  perPage: number,
  sort: string,
  sortField: string,
  states: string,
  term: string,
  totalCount: number,
};

const IssuesDefault = {
  error: false,
  errorMsg: [],
  fetching: false,
  perPage: 10,
  sort: 'DESC',
  sortField: 'UPDATED_AT',
  states: 'OPEN',
  term: '',
  totalCount: 0,
};

export default IssuesDefault;