const deepmerge = require('deepmerge');

const fundamental = require('./fundamental');
const account = require('./account');
const market = require('./market');
const quote = require('./quote');

const rootSchema = `
  type Query {
    # Account
    ${account.query}

    # Fundamental
    ${fundamental.query}

    # Market
    ${market.query}

    # Quote
    ${quote.query}
  }

  type Mutation {
    # Account
    ${account.mutation}
  }

  type schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = deepmerge.all([
  account.resolvers,
  fundamental.resolvers,
  market.resolvers,
  quote.resolvers
]);

const typeDefs = [
  rootSchema,
  account.typeDefs,
  fundamental.typeDefs,
  market.typeDefs,
  quote.typeDefs
];

exports.resolvers = resolvers;
exports.typeDefs = typeDefs;
