function additionalInfo(connector) {
  const path = 'user/additional_info';
  return connector.get(path);
}

function employmentData(connector) {
  const path = 'user/employment/';
  return connector.get(path);
}

function getUser(connector) {
  const path = 'user/';
  return connector.get(path);
}


function investmentProfile(connector) {
  const path = 'user/investment_profile';
  return connector.get(path);
}

async function login(username, password, connector) {
  const path = 'api-token-auth/';
  const formData = {
    username,
    password
  };
  const { body } = await connector.form(path, formData);

  return body;
}

module.exports = {
  additionalInfo,
  getUser,
  employmentData,
  investmentProfile,
  login
};
