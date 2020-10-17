import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getAuthParamsLS } from '../utils/localStorage';

const httpLink = new HttpLink({
  uri: 'http://localhost:1113',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const context = operation.getContext();
  operation.setContext({
    ...context,
    headers: {
      ...getAuthParamsLS(),
      ...context.headers,
    },
  });
  return forward(operation);
});

const logoutLink = onError(data => {
  const { networkError } = data;
  if (networkError?.result?.errors?.[0].extensions.code === 'UNAUTHENTICATED') {
    localStorage.clear();
  }
});

const client = new ApolloClient({
  link: logoutLink.concat(concat(authMiddleware, httpLink)),
  cache: new InMemoryCache(),
});

export default client;
