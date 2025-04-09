import { makeExecutableSchema } from '@graphql-tools/schema';
import { bookTypeDefs } from './book.typeDefs';
import { authorTypeDefs } from './author.typeDefs';
import { userTypeDefs } from './user.typeDefs';
import { gql } from 'apollo-server-express';

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [
  rootTypeDefs,
  bookTypeDefs,
  authorTypeDefs,
  userTypeDefs,
];

export const schema = makeExecutableSchema({
    typeDefs
});