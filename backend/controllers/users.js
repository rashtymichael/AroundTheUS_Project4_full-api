const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { errorsMessages, errorsStatus } = require('../constants/errors');

module.exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .orFail()
    .then((user) => { res.json(user); })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(errorsStatus.notFoundError)
          .send({ message: errorsMessages.isUserIdError });
      }

      return res
        .status(errorsStatus.defaultError)
        .send({ message: errorsMessages.isServerError });
    });
};

module.exports.createNewUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => {
      User.create({ name, about, avatar, email, password: hash })
        .then((user) => { res.json({ data: user }); })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res
              .status(errorsStatus.invalidDataError)
              .send({ message: errorsMessages.isInvalidDataError });
          }

          return res
            .status(errorsStatus.defaultError)
            .send({ message: errorsMessages.isServerError });
        });
    })

};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((modifiedUser) => { res.json(modifiedUser); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(errorsStatus.invalidDataError)
          .send({ message: errorsMessages.isInvalidDataError });
      } if (err.name === 'DocumentNotFoundError') {
        return res
          .status(errorsStatus.notFoundError)
          .send({ message: errorsMessages.isCardIdError });
      }

      return res
        .status(errorsStatus.defaultError)
        .send({ message: errorsMessages.isServerError });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((modifiedAvatar) => { res.json(modifiedAvatar); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(errorsStatus.invalidDataError)
          .send({ message: errorsMessages.isInvalidDataError });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(errorsStatus.notFoundError)
          .send({ message: errorsMessages.isCardIdError });
      }

      return res
        .status(errorsStatus.defaultError)
        .send({ message: errorsMessages.isServerError });
    });
};

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
