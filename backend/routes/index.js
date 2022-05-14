const cardsRouter = require('./cards');
const usersRouter = require('./users');
const { errorsMessages, errorsStatus } = require('../constants/errors');

const doesAdressExist = (req, res) => {
  res.status(errorsStatus.notFoundError).send({ message: errorsMessages.isResourceError });
};

const addTemporaryUserId = (req, res, next) => {
  req.user = {
    _id: '624454c612124331f48a1081',
  };

  next();
};

module.exports = {
  routes: [addTemporaryUserId, cardsRouter, usersRouter, doesAdressExist],
};
