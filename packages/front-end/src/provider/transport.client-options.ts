import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs } from './typedefs';

export const getOptions = () => {
  return {
    link: createHttpLink({
      credentials: 'include',
      uri: 'http://localhost:3000/graphql',
    }),
    cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
    typeDefs,
    resolvers: {},
  };
};
