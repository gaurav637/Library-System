import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers'

const app = express();
// app.use(express.json());
const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
    await graphqlServer.start();
    graphqlServer.applyMiddleware({ app: app as any });
}

startServer();
export default app;
