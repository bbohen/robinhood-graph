const Router = require('koa-router');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlKoa } = require('graphql-server-koa');

const { resolvers, typeDefs } = require('./schema');
const RobinhoodConnector = require('./connectors/Robinhood');

const router = new Router();
const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});
const routeHandler = graphqlKoa(ctx => ({
  schema,
  context: {
    connector: new RobinhoodConnector(ctx.state.authToken)
  }
}));

router.post('/graphql', routeHandler);
router.get('/graphql', routeHandler);

module.exports = router;
