const deepmerge = require('deepmerge');
const { gql } = require('apollo-server-express');

const account = require('./account');
const fundamental = require('./fundamental');
const historical = require('./historical');
const instrument = require('./instrument');
const market = require('./market');
const quote = require('./quote');
const user = require('./user');
const urlScalar = require('./scalars/url');

const rootSchema = `
  type Query {
    # Account
    ${account.query}

    # Fundamental
    ${fundamental.query}

    # Historical
    ${historical.query}

    # Instrument
    ${instrument.query}

    # Market
    ${market.query}

    # Quote
    ${quote.query}

    # User
    ${user.query}
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
  historical.resolvers,
  instrument.resolvers,
  market.resolvers,
  quote.resolvers,
  user.resolvers,
  urlScalar.resolvers
]);

const typeDefs = [
  rootSchema,
  account.typeDefs,
  fundamental.typeDefs,
  historical.typeDefs,
  instrument.typeDefs,
  market.typeDefs,
  quote.typeDefs,
  user.typeDefs,
  urlScalar.typeDefs
];

exports.resolvers = resolvers;
exports.typeDefs = typeDefs;
