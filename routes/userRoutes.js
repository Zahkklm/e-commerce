const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', createUser);
router.get('/', getAllUsers);

module.exports = router;
