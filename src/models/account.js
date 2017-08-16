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
  login
};
