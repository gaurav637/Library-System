import { bookResolvers } from './book.resolver';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authorResolver } from './author.resolver';
import { userResolver } from './user.resolver';

export const resolvers = [
  bookResolvers,
  authorResolver,
  userResolver
];