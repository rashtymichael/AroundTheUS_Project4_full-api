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

module.exports.getCurrentUserData = (req, res) => {
  res.send(req.user);
};
