import { InMemoryCache } from 'apollo-boost';
import fetch from 'node-fetch';

export const options = {
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
  ssrMode: true,
  fetch: fetch,
  cache: new InMemoryCache(),
};
