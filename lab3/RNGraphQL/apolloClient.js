import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import pak from './hidden/hidden.js'


const auth_string = 'Bearer ' + pak;

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql', 
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: auth_string, 
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
