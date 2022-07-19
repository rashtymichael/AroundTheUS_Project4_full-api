const signInRouter = require('express').Router();
const { login } = require('../controllers/signIn');
const { validateLogInData } = require('../middleware/celebrateValidation');

signInRouter.post('/signin', validateLogInData, login);

module.exports = signInRouter;
