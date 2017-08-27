# :construction: robinhood-graph :construction:

An unofficial WIP GraphQL transformation layer for Robinhood Trade's Private REST API. This is based on [unofficial documentation](https://github.com/sanko/Robinhood) but is not intended to have all the functionality of the REST API.

## Usage

**robinhood-graph requires a node version compatible with async/await (recommend a minimum of 7.10)**

1. `npm install`
2. `npm run dev `
3. `http://localhost:8080/graphiql` to utilize [graphiql](https://medium.com/the-graphqlhub/graphiql-graphql-s-killer-app-9896242b2125)

For use with a proxy like charles or fiddler
```bash
# Substitute 8888 for whatever port your proxy runs on
PROXY_PORT=8888 npm run dev
```
