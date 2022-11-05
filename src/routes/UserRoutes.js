const express = require('express');

const router = express.Router();

let userController = require('../controllers/UserController')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);

module.exports = router;