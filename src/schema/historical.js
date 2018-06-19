const { gql } = require('apollo-server-express');

const { historical: historicalModel } = require('../models');

const typeDefs = gql`
  type Historical {
    begins_at: String,
    open_price: String,
    close_price: Float,
    high_price: String,
    low_price: String,
    volume: Float,
    session: String,
    interpolated: Boolean
  }
`;

const query = `
history(
  bounds: String,
  interval: String,
  span: String,
  symbol: String
): [Historical],
`;

const resolvers = {
  Query: {
    history(_obj, {
      bounds,
      interval,
      span,
      symbol
    }, { connector }) {
      return historicalModel.getHistoryBySymbol(symbol, connector, interval, span, bounds);
    }
  }
};

module.exports = {
  typeDefs,
  query,
  resolvers
};
