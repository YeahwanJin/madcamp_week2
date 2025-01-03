const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUserPoints);

module.exports = router;