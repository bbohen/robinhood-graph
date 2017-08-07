const PORT = process.env.PORT || 8080;
const PROXY_PORT = process.env.PROXY_PORT;

const configuration = {
  port: PORT,
  robinHoodBaseUrl: 'https://api.robinhood.com/',
  requestDefaults: {
    json: true,
    resolveWithFullResponse: true,
    proxy: PROXY_PORT && `http://localhost:${PROXY_PORT}`,
    strictSSL: !PROXY_PORT,
    timeout: 30 * 1000,
    headers: {
      'user-agent': 'robinhood-graph'
    }
  }
};

module.exports = configuration;
