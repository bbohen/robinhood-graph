const {
  quote: quoteModel,
  fundamental: fundamentalModel,
  instrument: instrumentModel
} = require('../models');

const typeDefs = `
  type Quote {
    ask_price: String
    ask_size: Int
    bid_price: String
    bid_size: Int
    description: String
    high_52_weeks: Float
    low_52_weeks: Float
    last_trade_price: String
    last_extended_hours_trade_price: String
    simple_name: String
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
    },
    async high_52_weeks({ symbol }, _args, { connector }) {
      const { high_52_weeks: high52Weeks } = await fundamentalModel.getOne(symbol, connector);

      return high52Weeks;
    },
    async low_52_weeks({ symbol }, _args, { connector }) {
      const { low_52_weeks: low52Weeks } = await fundamentalModel.getOne(symbol, connector);

      return low52Weeks;
    },
    async simple_name({ symbol }, _args, { connector }) {
      const { simple_name: simpleName } = await instrumentModel.getInstrumentBySymbol(
        symbol,
        connector
      );

      return simpleName;
    }
  }
};

module.exports = {
  typeDefs,
  query,
  resolvers
};
