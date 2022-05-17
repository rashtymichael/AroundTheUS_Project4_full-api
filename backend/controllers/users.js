const User = require('../models/userModel');
const { errorsMessages } = require('../constants/errors');
const NotFoundError = require('../errors/NotFoundError');
const { checkUpdateUserProfileErrors } = require('../helpers/errors');

module.exports.getUserById = (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .orFail()
    .then((user) => { res.json(user); })
    .catch((err) => {
      let error;

      if (err.name === 'DocumentNotFoundError') {
        error = new NotFoundError(errorsMessages.isUserIdError);
      }

      next(error || err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((modifiedUser) => { res.json(modifiedUser); })
    .catch((err) => {
      const error = checkUpdateUserProfileErrors(err);

      next(error || err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((modifiedAvatar) => { res.json(modifiedAvatar); })
    .catch((err) => {
      const error = checkUpdateUserProfileErrors(err);

      next(error || err);
    });
};

module.exports.getCurrentUserData = (req, res) => {
  res.send(req.user);
};
