const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:username', userController.getUserStats);

module.exports = router;