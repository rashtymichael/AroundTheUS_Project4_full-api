const usersRouter = require('express').Router();
const User = require('../models/userModel');
const { findData } = require('../helpers');
const {
  getUserById, updateUser, updateUserAvatar, getCurrentUserData,
} = require('../controllers/users');
const { validateIdParam, validateUserUpdate, validateAvatarLink } = require('../middleware/celebrateValidation');

usersRouter.get('/users', findData(User));
usersRouter.get('/users/me', getCurrentUserData);
usersRouter.get('/users/:id', validateIdParam, getUserById);
usersRouter.patch('/users/me', validateUserUpdate, updateUser);
usersRouter.patch('/users/me/avatar', validateAvatarLink, updateUserAvatar);

module.exports = usersRouter;
