function getUser(connector) {
  const path = 'user/';
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
  getUser,
  login
};
