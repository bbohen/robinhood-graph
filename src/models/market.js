async function get(connector) {
  const path = 'markets/';
  const response = await connector.get(path);
  return response && response.results;
}

module.exports = {
  get
};
