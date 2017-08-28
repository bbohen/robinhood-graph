async function get(connector) {
  const path = 'accounts/';
  const { results = [] } = await connector.get(path);

  // just grabbing the first account for now
  // multi-account functionality doesn't seem to actually be supported
  return results[0];
}

async function getPositions(accountNumber, connector) {
  const path = `/accounts/${accountNumber}/positions/`;
  const { results = [] } = await connector.get(path);

  return results;
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
  get,
  getPositions,
  login
};
