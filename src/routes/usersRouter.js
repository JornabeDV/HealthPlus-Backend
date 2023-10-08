const { Router } = require('express');
const fileUpload = require('express-fileupload');

const postUser = require('../handlers/Users/postUser');
const getUserById = require('../handlers/Users/getUser');
const destroyUser = require('../handlers/Users/destroyUser');
const unableUser = require('../handlers/Users/unableUser');
const createUser = require('../handlers/Users/signUpUser');
const logInHandler = require('../handlers/Users/logInUser');
const updateUserHandler = require('../handlers/Users/updateUserHandler');

const usersRouter = Router();

usersRouter.post('/', postUser);

usersRouter.put('/profile', updateUserHandler);
usersRouter.post('/signup', fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}), createUser);

usersRouter.post('/login', logInHandler);
usersRouter.get('/:id', getUserById);
usersRouter.delete('/:id', destroyUser);
usersRouter.put('/:id', unableUser);

module.exports = usersRouter;