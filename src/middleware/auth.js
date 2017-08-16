function auth(ctx, next) {
  const authHeader = (ctx.headers && ctx.headers.authorization) || '';

  ctx.state.authToken = authHeader;

  return next();
}

module.exports = auth;
