import ApolloClient from 'apollo-client';

export const getTransport = (options: any) => {
  return new ApolloClient(options);
};
