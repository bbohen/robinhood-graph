const Router = require('koa-router');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa');

const { resolvers, typeDefs } = require('./schema');
const Robinhood = require('./connectors/Robinhood');

const router = new Router();
const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});
const routeHandler = graphqlKoa({
  schema,
  context: {
    connector: new Robinhood()
  }
});

router.post('/graphql', routeHandler);
router.get('/graphql', routeHandler);

router.post('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

module.exports = router;
