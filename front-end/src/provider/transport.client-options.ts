import { InMemoryCache } from 'apollo-boost';

export const options = {
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
};
