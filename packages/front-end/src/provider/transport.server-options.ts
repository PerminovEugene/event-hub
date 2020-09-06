import { SessionData } from '@event-hub/shared';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { getEnvManager } from '../framework/configuration/environment-manger-keeper';
import { createMe } from './store.actions/me';
import { typeDefs } from './typedefs';

type OptionsBuildConfig = {
  user: SessionData;
};

export const buildOptions = ({ user }: OptionsBuildConfig) => {
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: getEnvManager().getBackendApiUrl(),
    fetch: fetch as any,
    credentials: 'include',
  });
  cache.writeData({
    data: createMe(user),
  });
  return {
    link,
    ssrMode: true,
    cache,
    typeDefs,
    resolvers: {},
  };
};
