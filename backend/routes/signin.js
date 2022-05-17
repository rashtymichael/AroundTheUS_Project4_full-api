const signInRouter = require('express').Router();
const { login } = require('../controllers/signIn');

signInRouter.post('/signin', login);

module.exports = signInRouter;
