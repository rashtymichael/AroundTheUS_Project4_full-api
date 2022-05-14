const usersRouter = require('express').Router();
const User = require('../models/userModel');
const { findData } = require('../helpers');
const {
  getUserById, createNewUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', findData(User));
usersRouter.get('/users/:id', getUserById);
usersRouter.post('/users', createNewUser);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
