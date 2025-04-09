import { bookResolvers } from './book.resolver';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authorResolver } from './author.resolver';
import { userResolver } from './user.resolver';
import { borrowRecordResolver } from './borrowRecord.resolver';

export const resolvers = [
  bookResolvers,
  authorResolver,
  userResolver,
  borrowRecordResolver
];