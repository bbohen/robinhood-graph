async function getHistoryBySymbol(
  symbol,
  connector,
  interval = 'day'
) {
  const path = `quotes/historicals/${symbol}/?interval=${interval}&bounds=regular`;
  const { historicals = [] } = await connector.get(path);

  return historicals;
}

module.exports = {
  getHistoryBySymbol
};
