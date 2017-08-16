const Koa = require('koa');
const koaBody = require('koa-bodyparser');
const mount = require('koa-mount');
const serve = require('koa-static');
const path = require('path');

const auth = require('./middleware/auth');
const router = require('./router');

const app = new Koa();

app.use(koaBody());
app.use(mount('/graphiql', serve(path.resolve(__dirname, '..', 'graphiql'))));
app.use(auth);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => console.log('listening on 8080')); // eslint-disable-line
