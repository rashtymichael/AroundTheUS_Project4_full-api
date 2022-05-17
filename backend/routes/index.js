const cardsRouter = require('./cards');
const usersRouter = require('./users');
const signUpRouter = require('./signUp');
const signInRouter = require('./signIn');
const { errorsMessages } = require('../constants/errors');
const NotFoundError = require('../errors/NotFoundError');

const doesAdressExist = (req, res, next) => {
  next(new NotFoundError(errorsMessages.isResourceError));
};

module.exports = {
  unAuthRoutes: [signInRouter, signUpRouter],
  authRoutes: [cardsRouter, usersRouter, doesAdressExist],
};
