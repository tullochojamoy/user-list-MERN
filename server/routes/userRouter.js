const express = require('express');
const usersRouter = express.Router();

const { tryCatch } = require('../utils/tryCatch');

const { addUser, getUser } = require('../controllers/userController');

usersRouter.put('/', tryCatch(addUser));

usersRouter.get('/', tryCatch(getUser));

module.exports = usersRouter;