import { ApolloClient, InMemoryCache } from '@apollo/client';

const authorization = localStorage.getItem('t');
const id = localStorage.getItem('i');

const client = new ApolloClient({
  uri: 'http://localhost:1113/',
  cache: new InMemoryCache(),
  headers: {
    authorization,
    id,
  },
});

export default client;
