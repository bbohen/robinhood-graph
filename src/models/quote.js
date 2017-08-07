async function get(symbol, connector) {
  const path = `quotes/${symbol}/`;
  const response = await connector.get(path);
  return response;
}

module.exports = {
  get
};
