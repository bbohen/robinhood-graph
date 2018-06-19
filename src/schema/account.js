const { gql } = require('apollo-server');

const { account: accountModel, instrument: instrumentModel } = require('../models');

const typeDefs = gql`
  type Authentication {
    token: ID
  }

  type Account {
    account_Number: String!
    buying_power: String
    cash: String
    cash_available_for_withdrawal: String
    cash_balances: CashBalances
    positions: [Position]
    type: String
    updated_at: String
  }

  type CashBalances {
    buying_power: String
    cash: String
    cash_available_for_withdrawal: String
    cash_held_for_orders: String
    created_at: String
    outstanding_interest: String
    uncleared_deposits: String
    unsettled_debit: String
    unsettled_funds: String
    updated_at: String
  }

  type Position {
    shares_held_for_stock_grants: String
    intraday_quantity: String
    intraday_average_buy_price: String
    instrument: Instrument
    created_at: String
    updated_at: String
    shares_held_for_buys: String
    average_buy_price: String
    shares_held_for_sells: String
    quantity: String
  }
`;

const query = 'account: Account';

const mutation = `
  login(
    username: String!
    password: String!
  ): Authentication
`;

const resolvers = {
  Query: {
    account(_obj, _args, { connector }) {
      return accountModel.get(connector);
    }
  },
  Mutation: {
    login(_obj, { username, password }, { connector }) {
      return accountModel.login(username, password, connector);
    }
  },
  Account: {
    positions({ account_number }, _args, { connector }) {
      return accountModel.getPositions(account_number, connector);
    }
  },
  Position: {
    instrument({ instrument }, _args, { connector }) {
      const id = instrument.split('/')[4];

      return instrumentModel.getInstrumentByID(id, connector);
    }
  }
};

module.exports = {
  typeDefs,
  query,
  mutation,
  resolvers
};
