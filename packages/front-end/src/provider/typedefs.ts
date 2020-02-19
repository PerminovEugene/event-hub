import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Me {
    role: String!
    user_id: ID
    status: String
    email: String
  }

  extend type Query {
    isLoggedIn: Boolean!
    getMyself: Me
  }

  extend type Mutation {
    setLoggedIn(status: Boolean!): Boolean
  }
`;
