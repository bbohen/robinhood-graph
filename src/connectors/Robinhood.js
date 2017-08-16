const DataLoader = require('dataloader');
const rp = require('request-promise');

const config = require('../../config');

const resultCache = {};

class RobinhoodConnector {
  constructor(token) {
    this.loader = new DataLoader(RobinhoodConnector.fetch.bind(this));
    this.baseUrl = config.robinHoodBaseUrl;
    this.token = `Token ${token}`;
  }

  static fetch(urls) {
    return Promise.all(urls.map(url =>
      new Promise((resolve, reject) => {
        rp(Object.assign({}, config.requestDefaults, {
          uri: url,
          headers: {
            Authorization: this.token
          }
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

  form(path, formData) {
    return rp(Object.assign({}, config.requestDefaults, {
      uri: `${this.baseUrl + path}`,
      method: 'POST',
      formData
    }));
  }
}

module.exports = RobinhoodConnector;
