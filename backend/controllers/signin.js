const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { errorsMessages } = require('../constants/errors');
const AuthenticationError = require('../errors/AuthenticationError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let returnedUser;

  User.findOne({ email }).select('+password')
    .orFail()
    .then((user) => {
      returnedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new AuthenticationError(errorsMessages.isAuthorizationError);
      }

      const token = jwt.sign(
        { _id: returnedUser._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );

      return res.send({ token });
    })
    .catch((err) => {
      let error;

      if (err.name === 'DocumentNotFoundError') {
        error = new AuthenticationError(errorsMessages.isUserDataError);
      }

      next(error || err);
    });
};
