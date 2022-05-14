const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { errorsMessages, errorsStatus } = require('../constants/errors');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  let returnedUser;

  User.findOne({ email })
    .orFail()
    .then((user) => {
      returnedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        const incorrectPasswordError = new Error(errorsMessages.isUserDataError);
        incorrectPasswordError.name = 'incorrectPasswordError';

        return Promise.reject(incorrectPasswordError);
      }

      const token = jwt.sign(
        { _id: returnedUser._id },
        'some-secret-key',
        { expiresIn: '7d' }
      );

      res.send({ token: token });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError' || err.name === 'incorrectPasswordError') {
        return res
          .status(errorsStatus.authenticationError)
          .send(errorsMessages.isUserDataError);
      }

      return res
        .status(errorsStatus.defaultError)
        .send({ message: errorsMessages.isServerError });
    })
};