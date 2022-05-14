const signInRouter = require('express').Router();
const { login } = require('../controllers/signin');

signInRouter.post('/signin', login);

module.exports = signInRouter;
