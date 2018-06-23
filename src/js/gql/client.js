// @flow

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { GQL_ENDPOINT } from '../constants/gql';
import { STORAGE_SSKEY } from '../constants/storage';
import { delToken } from '../actions/tokenActions';
import store from '../storage/store';


/**
* Graph QL client.
* 
* Based on this good example: https://github.com/apollographql/apollo-link/issues/297
*/

const httpLink = new HttpLink({
    uri: GQL_ENDPOINT
});

let token;

const withToken = setContext(async (_, { headers }) => {
    (token = (sessionStorage.getItem(STORAGE_SSKEY)) || '');
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
        }
    };
});
  
  const resetToken = onError(({ response, networkError }) => {
    if (networkError && networkError.statusCode === 401) {
      store.dispatch(delToken());
      networkError = undefined;
    }
  });
  
  const authFlowLink = withToken.concat(resetToken);
  const link = authFlowLink.concat(httpLink);
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
    cache
  });

  
  window.qlClient = client;
  export default client;