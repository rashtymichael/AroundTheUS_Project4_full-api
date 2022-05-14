const signUpRouter = require('express').Router();
const { createNewUser } = require('../controllers/signup');

signUpRouter.post('/signup', createNewUser);

module.exports = signUpRouter;
