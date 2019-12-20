import { HttpLink, createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import fetch from 'node-fetch';

const link = createHttpLink({ uri: 'http://localhost:3000/graphql', fetch: fetch as any, credentials: 'include', });


export const options = {
  link: link,
  
  ssrMode: true,
  cache: new InMemoryCache(),
};
