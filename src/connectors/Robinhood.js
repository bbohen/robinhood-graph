const DataLoader = require('dataloader');
const rp = require('request-promise');

const config = require('../../config');

const resultCache = {}; // Not being utilized, see line 16

class RobinhoodConnector {
  constructor() {
    this.loader = new DataLoader(RobinhoodConnector.fetch.bind(this));
    this.baseUrl = config.robinHoodBaseUrl;
  }

  static fetch(urls) {
    return Promise.all(urls.map(url =>
      // Could check here for cached responses within resultCache,
      new Promise((resolve, reject) => {
        rp(Object.assign({}, config.requestDefaults, {
          uri: url
        })).then(({ body }) => {
          resultCache[url] = {
            result: body
          };
          resolve(body);
        }).catch((err) => {
          reject(err);
        });
      })
    ));
  }

  get(path) {
    return this.loader.load(`${this.baseUrl + path}`);
  }
}

module.exports = RobinhoodConnector;
