const { user: userModel } = require('../models');

const typeDefs = `
  type User {
    id: ID
    username: String
    first_name: String
    last_name: String
    id_info: Url
    url: Url
    basic_info: Url
    email: String
    investment_profile: InvestmentProfile
    international_info: Url
    employment: EmploymentData
    additional_info: AdditionalInfo
  }

  type AdditionalInfo {
    control_person: Boolean
    control_person_security_symbol: String
    object_to_disclosure: Boolean
    security_affiliated_address: String
    security_affiliated_employee: Boolean
    security_affiliated_firm_name: String
    security_affiliated_firm_relationship: String
    security_affiliated_person_name: String
    sweep_consent: Boolean
    updated_at: String
  }

  type EmploymentData {
    employer_address: String
    employer_city: String
    employer_state: String
    employer_zipcode: String
    employer_status: String
    occupation: String
    updated_at: String
    years_employed: Int
  }

  type InvestmentProfile {
    annual_income: String
    investment_experience: String
    investment_objective: String
    liquid_net_worth: String
    liquidity_needs: String
    risk_tolerence: String
    source_of_funds: String
    suitability_verified: Boolean
    tax_bracket: String
    time_horizon: String
    total_net_worth: String
    updated_at: String
  }
`;

const query = `
  user: User
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
      return userModel.getUser(connector);
    }
  },
  Mutation: {
    login(_obj, { username, password }, { connector }) {
      return userModel.login(username, password, connector);
    }
  },
  User: {
    additional_info(_obj, _args, { connector }) {
      return userModel.additionalInfo(connector);
    },
    employment(_obj, _args, { connector }) {
      return userModel.employmentData(connector);
    },
    investment_profile(_obj, _args, { connector }) {
      return userModel.investmentProfile(connector);
    }
  }
};

module.exports = {
  typeDefs,
  query,
  mutation,
  resolvers
};
