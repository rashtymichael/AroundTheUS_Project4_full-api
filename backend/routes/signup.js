const signUpRouter = require('express').Router();
const { createNewUser } = require('../controllers/signUp');
const { validateAvatarLink, validateUserUpdate, validateLogInData } = require('../middleware/celebrateValidation');

signUpRouter.post('/signup', validateUserUpdate, validateAvatarLink, validateLogInData, createNewUser);

module.exports = signUpRouter;
