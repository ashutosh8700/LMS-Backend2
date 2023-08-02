const express = require('express');
// importing Router
const router = express.Router();

// importing controller
const {
    register,
    login,
    logout,
    getProfile
} = require('./../controllers/user.controller')

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/me', getProfile);

module.exports = router;