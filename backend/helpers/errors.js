const InvalidDataError = require('../errors/InvalidDataError');
const NotFoundError = require('../errors/NotFoundError');
const { errorsMessages } = require('../constants/errors');

const checkUpdateUserProfileErrors = (err) => {
  if (err.name === 'ValidationError') {
    return new InvalidDataError(errorsMessages.isInvalidDataError);
  }

  if (err.name === 'DocumentNotFoundError') {
    return new NotFoundError(errorsMessages.isUserIdError);
  }

  return null;
};

const checkCardErrors = (err) => {
  if (err.name === 'DocumentNotFoundError') {
    return new NotFoundError(errorsMessages.isCardIdError);
  }

  if (err.name === 'CastError') {
    return new InvalidDataError(errorsMessages.isInvalidDataError);
  }

  return null;
};

module.exports = { checkUpdateUserProfileErrors, checkCardErrors };
