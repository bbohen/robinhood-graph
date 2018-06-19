const { ApolloServer } = require('apollo-server');

const { resolvers, typeDefs } = require('./schema');
const RobinhoodConnector = require('./connectors/Robinhood');

// TODO: Bring back auth middleware that will pass the token to the Robinhood connector
const context = {
  connector: new RobinhoodConnector()
};
const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
