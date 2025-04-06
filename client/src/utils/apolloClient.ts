import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:3001/graphql',
  });