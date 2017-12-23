const {
  quote: quoteModel,
  fundamental: fundamentalModel
} = require('../models');

const typeDefs = `
  type Quote {
    ask_price: String
    ask_size: Int
    bid_price: String
    bid_size: Int
    description: String
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

  quotes(
    symbols: [String]
  ): [Quote]
`;

const resolvers = {
  Query: {
    quote(_obj, { symbol }, { connector }) {
      return quoteModel.getOne(symbol, connector);
    },
    quotes(_obj, { symbols }, { connector }) {
      return quoteModel.getMultiple(symbols, connector);
    }
  },
  Quote: {
    async description({ symbol }, _args, { connector }) {
      const { description } = await fundamentalModel.getOne(symbol, connector);

      return description;
    }
  }
};

module.exports = {
  typeDefs,
  query,
  resolvers
};
