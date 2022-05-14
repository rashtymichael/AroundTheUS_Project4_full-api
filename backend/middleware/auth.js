const jwt = require('jsonwebtoken');
const { errorsMessages, errorsStatus } = require('../constants/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(errorsStatus.unAuthorizedError)
      .send({ message: errorsMessages.isAuthorizationError });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(errorsStatus.authenticationError)
      .send({ message: errorsMessages.isAuthorizationError });
  }

  req.user = payload;
  return next();
};
