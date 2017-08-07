const { quote: quoteModel } = require('../models');

const typeDefs = `
  type Quote {
    ask_price: String
    ask_size: Int
    bid_price: String
    bid_size: Int
    last_trade_price: String
    last_extended_hours_trade_price: String
    previous_close: String
    adjusted_previous_close: String
    previous_close_date: String
    symbol: String
    trading_halted: Boolean
    updated_at: String
  }
`;

const query = `
  quote(
    symbol: String
  ): Quote
`;

const resolvers = {
  Query: {
    quote(_obj, { symbol }, { connector }) {
      return quoteModel.get(symbol, connector);
    }
  }
};

module.exports = {
  typeDefs,
  query,
  resolvers
};
