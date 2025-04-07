import { makeExecutableSchema } from '@graphql-tools/schema';
import { bookTypeDefs } from './book.typeDefs';
import { gql } from 'apollo-server-express';

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [
  rootTypeDefs,
  bookTypeDefs,
];

export const schema = makeExecutableSchema({
    typeDefs
});