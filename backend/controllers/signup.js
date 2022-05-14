const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { errorsMessages, errorsStatus } = require('../constants/errors');

module.exports.createNewUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
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
    });
};
