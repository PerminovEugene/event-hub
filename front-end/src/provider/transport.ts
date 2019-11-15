import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  // link: link,
  cache: new InMemoryCache(),
  // headers: {
  // 'x-custom-header': 'test'
  //  },
  credentials: 'include',
});
