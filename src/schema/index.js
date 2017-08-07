const deepmerge = require('deepmerge');

const market = require('./market');
const quote = require('./quote');

const rootSchema = `
  type Query {
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
  market.resolvers,
  quote.resolvers
]);

const typeDefs = [
  rootSchema,
  market.typeDefs,
  quote.typeDefs
];

exports.resolvers = resolvers;
exports.typeDefs = typeDefs;
