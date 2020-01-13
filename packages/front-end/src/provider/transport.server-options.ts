import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import { typeDefs } from './typedefs';
// import { resolvers } from './resolvers';
import { SessionData } from '@calendar/shared';
import { createMe } from './store.actions/me';

type OptionsBuildConfig = {
  user: SessionData;
};

export const buildOptions = ({ user }: OptionsBuildConfig) => {
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: 'http://localhost:3000/graphql',
    fetch: fetch as any,
    credentials: 'include',
  });
  console.log('user: ', user);
  cache.writeData({
    data: createMe(user),
  });
  return {
    link,
    ssrMode: true,
    cache,
    typeDefs,
    resolvers: {},
    // ssrForceFetchDelay: 5,
  };
};
