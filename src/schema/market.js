const { gql } = require('apollo-server-express');

const { market: marketModel } = require('../models');

const typeDefs = gql`
  type Market {
    website: String
    city: String
    name: String
    url : String
    country: String
    todays_hours: String
    operating_mic_: String
    acronym: String
    timezone: String
    mic: String
  }
`;

const query = `
  markets: [Market]
`;

const resolvers = {
  Query: {
    markets(_obj, _args, { connector }) {
      return marketModel.get(connector);
    }
  }
};

module.exports = {
  typeDefs,
  query,
  resolvers
};
