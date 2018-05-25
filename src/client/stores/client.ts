import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import fetch from 'unfetch';
import { onError } from 'apollo-link-error';
import store from './index';

const logger = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    },
  });
  const { loc } = operation.query;

  return forward
    ? forward(operation).map(result => {
        console.info(
          `---- graphql request for ${operation.operationName} ----\n`,
        );
        console.info({
          operationName: operation.operationName,
          query: loc && loc.source.body,
          variables: operation.variables,
          response: result,
        });
        return result;
      })
    : null;
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  let error: string | Error = '';
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      error += `${message} \n`;
    });
  }
  if (networkError) {
    error += networkError;
  }
  if (error) {
    error = new Error(error);
    store.errorStore.setError(error);
  } else {
    store.errorStore.resetError();
  }
});
const middlewareLink = [logger, errorLink];

let link = createHttpLink({
  uri: config.graphqlUri,
  fetch,
});
link = middlewareLink.reduce((pre, next) => next.concat(pre), link);

const client = new ApolloClient<any>({
  link,
  cache: new InMemoryCache() as any,
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
  },
});
export default client;
