import { bookResolvers } from './book.resolver';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const resolvers = [
  bookResolvers,
];