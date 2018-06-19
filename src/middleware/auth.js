function auth(req, res, next) {
  const authHeader = (req.headers && req.headers.authorization) || '';

  req.authToken = authHeader;

  next();
}

module.exports = auth;