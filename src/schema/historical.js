const { historical: historicalModel } = require('../models');

const typeDefs = `
  type Historical {
    begins_at: String,
    open_price: String,
    close_price: String,
    high_price: String,
    low_price: String,
    volume: Float,
    session: String,
    interpolated: Boolean
  }
`;

const query = `
history(
  symbol: String
): [Historical],
`;

const resolvers = {
  Query: {
    history(_obj, { symbol }, { connector }) {
      return historicalModel.getHistoryBySymbol(symbol, connector);
    }
  }
};

module.exports = {
  typeDefs,
  query,
  resolvers
};
