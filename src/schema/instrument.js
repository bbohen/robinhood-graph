const { instrument: instrumentModel } = require('../models');

const typeDefs = `
  type Instrument {
    min_tick_size: String,
    type: String,
    splits: String,
    margin_initial_ratio: String,
    tradability: String,
    bloomberg_unique: String,
    list_date: String,
    name: String,
    symbol: String,
    fundamentals: String,
    state: String,
    country: String,
    day_trade_ratio: String,
    tradeable: Boolean,
    maintenance_ratio: String,
    id: ID,
    simple_name: String
  }
`;

const query = `
instrument(
  symbol: String
): Instrument,
instruments(
  symbols: [String]
): [Instrument]
`;

const resolvers = {
  Query: {
    instrument(_obj, { symbol }, { connector }) {
      return instrumentModel.getInstrumentBySymbol(symbol, connector);
    },
    instruments(_obj, { symbols }, { connector }) {
      return instrumentModel.getInstrumentsBySymbols(symbols, connector);
    }
  }
};

module.exports = {
  typeDefs,
  query,
  resolvers
};
