const {Router} = require('express');
const groupController = require('../controller/group');
const { authenticate } = require('../middleware/auth');

const routes = new Router();

// Add routes
routes.post('/add-group',authenticate , groupController.addGroup);
routes.get('/get-group',authenticate , groupController.getGroup);
// routes.get('/get-chat',authenticate, chatController.getChat);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;
