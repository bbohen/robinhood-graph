async function getHistoryBySymbol(
  symbol,
  connector,
  interval = '10minute',
  span = 'day',
  bounds = 'regular',
) {
  const path = `quotes/historicals/${symbol}/?interval=${interval}&span=${span}&bounds=${bounds}`;
  const { historicals = [] } = await connector.get(path);

  return historicals;
}

module.exports = {
  getHistoryBySymbol
};
