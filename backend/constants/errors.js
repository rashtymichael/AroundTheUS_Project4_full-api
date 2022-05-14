const errorsMessages = {
  isServerError: 'An error has occurred on the server',
  isUserIdError: 'User Id not found',
  isCardIdError: 'Card Id not found',
  isUserDataError: 'Incorrect password or email',
  isInvalidDataError: 'Invalid Data',
  isResourceError: 'Requested resource not found',
};

const errorsStatus = {
  authenticationError: 401,
  notFoundError: 404,
  invalidDataError: 400,
  defaultError: 500,
};

module.exports = { errorsMessages, errorsStatus };
