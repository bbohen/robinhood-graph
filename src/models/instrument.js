function getInstrumentByID(id, connector) {
  const path = `instruments/${id}/`;

  return connector.get(path);
}

module.exports = {
  getInstrumentByID
};
