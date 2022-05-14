const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { validateLink } = require('../helpers');
const { errorsMessages } = require('../constants/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: [validateLink, errorsMessages.isInvalidData],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, errorsMessages.isInvalidData],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
