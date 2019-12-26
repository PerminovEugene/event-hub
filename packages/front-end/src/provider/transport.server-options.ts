import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

type OptionsBuildConfig = {
  isLoggedIn: boolean;
};

export const buildOptions = ({ isLoggedIn }: OptionsBuildConfig) => {
  const cache = new InMemoryCache();
  debugger;
  const link = createHttpLink({
    uri: 'http://localhost:3000/graphql',
    fetch: fetch as any,
    credentials: 'include',
  });
  cache.writeData({
    data: {
      isLoggedIn: isLoggedIn,
    },
  });
  return {
    link: link,
    ssrMode: true,
    cache: cache,
    typeDefs,
    resolvers,
  };
};
