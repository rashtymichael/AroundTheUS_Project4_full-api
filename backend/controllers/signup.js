const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { errorsMessages } = require('../constants/errors');
const InvalidDataError = require('../errors/InvalidDataError');

module.exports.createNewUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => { res.json(user); })
        .catch((err) => {
          let error;

          if (err.name === 'ValidationError') {
            error = new InvalidDataError(errorsMessages.isInvalidDataError);
          }

          next(error || err);
        });
    })
    .catch(next);
};
