const mongoose = require('mongoose');
const { validateLink } = require('../helpers');
const { errorsMessages } = require('../constants/errors');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errorsMessages.isRequiredError],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, errorsMessages.isRequiredError],
    validate: [validateLink, errorsMessages.isLinkValidError],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, errorsMessages.isRequiredError],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
