const { fundamental: fundamentalModel } = require('../models');

const typeDefs = `
  type Fundamental {
    open: Int
    high: Int
    low: Int
    volume: Int
    average_volume: Int
    high_52_weeks: Int
    low_52_weeks: Int
    market_cap: Int
    dividend_yield: Int
    pe_ratio: Int
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
