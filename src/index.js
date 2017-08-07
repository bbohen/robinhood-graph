const Koa = require('koa');
const koaBody = require('koa-bodyparser');

const router = require('./router');

const app = new Koa();

app.use(koaBody());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => console.log('listening on 8080')); // eslint-disable-line
