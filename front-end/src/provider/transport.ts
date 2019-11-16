import ApolloClient from 'apollo-boost';

export const getTransport = (options: any) => {
  return new ApolloClient(options);
};
