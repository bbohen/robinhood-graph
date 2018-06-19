const { gql } = require('apollo-server-express');

const {
  quote: quoteModel,
  fundamental: fundamentalModel,
  instrument: instrumentModel
} = require('../models');
const differenceInHours = require('date-fns/difference_in_hours');

const typeDefs = gql`
  type Quote {
    ask_price: String
    ask_size: Int
    bid_price: String
    bid_size: Int
    description: String
    high_52_weeks: Float
    hours_since_update: String
    low_52_weeks: Float
    last_trade_price: String
    last_extended_hours_trade_price: String
    simple_name: String
    trade_price_delta: Float
    trade_price_delta_percentage: String
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

  quoteSearch(
    term: String
  ): Quote
`;

const resolvers = {
  Query: {
    quote(_obj, { symbol }, { connector }) {
      return quoteModel.getOne(symbol, connector);
    },
    quotes(_obj, { symbols }, { connector }) {
      return quoteModel.getMultiple(symbols, connector);
    },
    async quoteSearch(_obj, { term }, { connector }) {
      let quote;

      try {
        // Check for a matching symbol first
        quote = await quoteModel.getOne(term, connector);
      } catch (error) {
        // No matching symbol found, die quietly so we can search by query
      }

      if (quote) {
        return quote;
      }

      const { symbol: symbolResult } = await instrumentModel.getInstrumentByQuery(
        term,
        connector
      );

      return quoteModel.getOne(symbolResult, connector);
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
    },
    hours_since_update({ updated_at }) {
      const difference = `${differenceInHours(updated_at, new Date())}`;
      return difference && difference.replace('-', '');
    },
    trade_price_delta({
      adjusted_previous_close: adjustedPreviousClose,
      last_trade_price: lastTradePrice
    }) {
      return (parseFloat(lastTradePrice) - parseFloat(adjustedPreviousClose)).toFixed(2);
    },
    trade_price_delta_percentage({
      adjusted_previous_close: adjustedPreviousClose,
      last_trade_price: lastTradePrice
    }) {
      const tradePriceDelta = (parseFloat(lastTradePrice) -
        parseFloat(adjustedPreviousClose)).toFixed(2);
      const unformattedPercentage = ((tradePriceDelta / adjustedPreviousClose) * 100);

      return `${unformattedPercentage.toFixed(2)}%`;
    }
  }
};

module.exports = {
  typeDefs,
  query,
  resolvers
};
