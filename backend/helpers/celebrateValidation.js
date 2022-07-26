const isUrl = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');

const validateUrl = (value, helpers) => {
  if (isUrl(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateEmail = (value, helpers) => {
  if (isEmail(value)) {
    return value;
  }
  return helpers.error('string.email');
};

module.exports = { validateUrl, validateEmail };
