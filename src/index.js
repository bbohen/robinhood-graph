// TODO: Switch to Koa when below issue is resolved
// https://github.com/apollographql/apollo-server/issues/1088
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const auth = require('./middleware/auth');
const { resolvers, typeDefs } = require('./schema');
const RobinhoodConnector = require('./connectors/Robinhood');

const PATH = '/graphql';
const PORT = 4000;

const app = express();
const context = ({ req: { authToken } }) => ({
  connector: new RobinhoodConnector(authToken)
});
const server = new ApolloServer({ typeDefs, resolvers, context });

app.use(PATH, auth);
server.applyMiddleware({ app, path: PATH });
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
