const deepmerge = require('deepmerge');

const fundamental = require('./fundamental');
const market = require('./market');
const quote = require('./quote');

const rootSchema = `
  type Query {
    # Fundamental
    ${fundamental.query}

    # Market
    ${market.query}

    # Quote
    ${quote.query}
  }

  schema {
    query: Query
  }
`;

const resolvers = deepmerge.all([
  fundamental.resolvers,
  market.resolvers,
  quote.resolvers
]);

const typeDefs = [
  rootSchema,
  fundamental.typeDefs,
  market.typeDefs,
  quote.typeDefs
];

exports.resolvers = resolvers;
exports.typeDefs = typeDefs;
