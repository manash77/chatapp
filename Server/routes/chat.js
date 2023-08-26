const {Router} = require('express');
const chatController = require('../controller/chat');
const { authenticate } = require('../middleware/auth');

const routes = new Router();

// Add routes
routes.post('/send-chat',authenticate , chatController.sendChat);
routes.get('/get-chat',authenticate, chatController.getChat);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;
