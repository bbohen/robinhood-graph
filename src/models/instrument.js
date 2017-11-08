function getInstrumentByID(id, connector) {
  const path = `instruments/${id}/`;

  return connector.get(path);
}

async function getInstrumentBySymbol(symbol, connector) {
  const path = `instruments/?symbol=${symbol}`;
  const { results = [] } = await connector.get(path);

  return results[0];
}

async function getInstrumentsBySymbols(symbols, connector) {
  const instrumentArray = await Promise.all(symbols.map(async (symbol) => {
    const path = `instruments/?symbol=${symbol}`;
    const { results = [] } = await connector.get(path);

    return results[0];
  }));

  return instrumentArray;
}

module.exports = {
  getInstrumentByID,
  getInstrumentBySymbol,
  getInstrumentsBySymbols
};
