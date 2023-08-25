const {Router} = require('express');
const userController = require('../controller/user');

const routes = new Router();

// Add routes
routes.post('/signup', userController.signUp);
routes.post('/login', userController.loginUser);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;
