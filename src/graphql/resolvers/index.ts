import { bookResolvers } from './book.resolver';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authorResolver } from './author.resolver';

export const resolvers = [
  bookResolvers,
  authorResolver
];