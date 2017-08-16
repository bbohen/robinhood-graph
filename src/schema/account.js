const { account: accountModel } = require('../models');

const typeDefs = `
  type Account {
    token: ID
  }
`;

const query = `
  markets: [Market]
`;

const mutation = `
  login(
    username: String!
    password: String!
  ): Account
`;

const resolvers = {
  Query: {},
  Mutation: {
    login(_root, { username, password }, { connector }) {
      return accountModel.login(username, password, connector);
    }
  },
  Account: {}
};

module.exports = {
  typeDefs,
  query,
  mutation,
  resolvers
};
