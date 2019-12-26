import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

export const getOptions = () => ({
  link: createHttpLink({
    credentials: 'include',
    uri: 'http://localhost:3000/graphql',
  }),
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
  typeDefs,
  resolvers: resolvers,
});
