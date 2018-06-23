import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import store from './js/storage/store';
import App from './js/components/App/App';
import client from './js/gql/client';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const AppWithApolloProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <AppWithApolloProvider />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
