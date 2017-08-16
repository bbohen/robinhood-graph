const { account: accountModel } = require('../models');

const typeDefs = `
  type Account {
    token: ID
  }

  type UserInfo {
    id: ID
    username: String
    first_name: String
    last_name: String
    id_info: Url
    url: Url
    basic_info: Url
    email: String
    investment_profile: Url
    international_info: Url
    employment: Url
    additional_info: Url
  }
`;

const query = `
  user: UserInfo
`;

const mutation = `
  login(
    username: String!
    password: String!
  ): Account
`;

const resolvers = {
  Query: {
    user(_obj, _args, { connector }) {
      return accountModel.getUser(connector);
    }
  },
  Mutation: {
    login(_obj, { username, password }, { connector }) {
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
