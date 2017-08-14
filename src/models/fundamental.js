async function getMultiple(symbols, connector) {
  const path = `fundamentals/?symbols=${symbols.join(',')}`;
  const { results = [] } = await connector.get(path);

  return results;
}

function getOne(symbol, connector) {
  const path = `fundamentals/${symbol}/`;

  return connector.get(path);
}

module.exports = {
  getMultiple,
  getOne
};
