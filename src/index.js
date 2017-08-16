const Koa = require('koa');
const koaBody = require('koa-bodyparser');
const mount = require('koa-mount');
const serve = require('koa-static');
const path = require('path');

const auth = require('./middleware/auth');
const router = require('./router');

const app = new Koa();

// body parser
app.use(koaBody());
// custom graphiql with auth token integration
app.use(mount('/graphiql', serve(path.resolve(__dirname, '..', 'graphiql'))));
// auth middleware that adds the auth token to the request context
app.use(auth);
// set up the router
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => console.log('listening on 8080')); // eslint-disable-line
