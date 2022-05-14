const cardsRouter = require('./cards');
const usersRouter = require('./users');
const signUpRouter = require('./signup');
const signInRouter = require('./signin');
const { errorsMessages, errorsStatus } = require('../constants/errors');

const doesAdressExist = (req, res) => {
  res.status(errorsStatus.notFoundError).send({ message: errorsMessages.isResourceError });
};

module.exports = {
  unAuthRoutes: [signInRouter, signUpRouter],
  authRoutes: [cardsRouter, usersRouter, doesAdressExist],
};
