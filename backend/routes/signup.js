const signUpRouter = require('express').Router();
const { createNewUser } = require('../controllers/signUp');

signUpRouter.post('/signup', createNewUser);

module.exports = signUpRouter;
