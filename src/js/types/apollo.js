// @flow


/**
* Apollo type defs.
*/

export type ApolloResponseType = {
  data: Object,
  loading: boolean,
  networkStatus: number,
  stale: boolean,
};