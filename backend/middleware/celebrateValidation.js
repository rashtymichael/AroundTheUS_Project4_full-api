const { celebrate, Joi } = require('celebrate');
const { validateEmail, validateUrl } = require('../helpers/celebrateValidation');

const validateCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }).unknown(true),
});

const validateIdParam = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
});

const validateAvatarLink = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }).unknown(true),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
});

const validateLogInData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }).unknown(true),
});

module.exports = {
  validateAvatarLink, validateCardData, validateIdParam, validateLogInData, validateUserUpdate,
};
