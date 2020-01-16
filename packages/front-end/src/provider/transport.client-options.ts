import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs } from './typedefs';
import { getEnvManager } from '../framework/configuration/environment-manger-keeper';

export const getOptions = () => {
  return {
    link: createHttpLink({
      credentials: 'include',
      uri: getEnvManager().getBackendApiUrl(),
    }),
    cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
    typeDefs,
    resolvers: {},
  };
};
