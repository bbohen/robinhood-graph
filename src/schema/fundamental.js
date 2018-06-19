const { gql } = require('apollo-server-express');

const { fundamental: fundamentalModel } = require('../models');

const typeDefs = gql`
  type Fundamental {
    open: Float
    high: Float
    low: Float
    volume: Float
    average_volume: Float
    high_52_weeks: Float
    low_52_weeks: Float
    market_cap: Float
    dividend_yield: Float
    pe_ratio: Float
    description: String
    Instrument: String
  }
`;

const query = `
  fundamental(
    symbol: String
  ): Fundamental,
  fundamentals(
    symbols: [String]
  ): [Fundamental]
`;

const resolvers = {
  Query: {
    fundamental(_obj, { symbol }, { connector }) {
      return fundamentalModel.getOne(symbol, connector);
    },
    fundamentals(_obj, { symbols }, { connector }) {
      return fundamentalModel.getMultiple(symbols, connector);
    }
  }
};

module.exports = {
  typeDefs,
  query,
  resolvers
};
