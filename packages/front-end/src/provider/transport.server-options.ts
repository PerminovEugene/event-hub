import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import { typeDefs } from './typedefs';
import { SessionData } from '@calendar/shared';
import { createMe } from './store.actions/me';
import { getEnvManager } from '../framework/configuration/environment-manger-keeper';

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
