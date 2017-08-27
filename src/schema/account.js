const { account: accountModel } = require('../models');

const typeDefs = `
  type Account {
    token: ID
  }
`;

const query = 'account: Account';

const mutation = `
  login(
    username: String!
    password: String!
  ): Account
`;

const resolvers = {
  Mutation: {
    login(_obj, { username, password }, { connector }) {
      return accountModel.login(username, password, connector);
    }
  }
};

module.exports = {
  typeDefs,
  query,
  mutation,
  resolvers
};
