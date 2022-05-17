const jwt = require('jsonwebtoken');
const { errorsMessages } = require('../constants/errors');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const AuthenticationError = require('../errors/AuthenticationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthorizedError(errorsMessages.isAuthorizationError));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new AuthenticationError(errorsMessages.isAuthorizationError));
  }

  req.user = payload;
  return next();
};
