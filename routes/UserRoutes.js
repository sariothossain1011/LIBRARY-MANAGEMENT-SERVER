const express = require('express');
const { registration, login } = require('../controllers/users/UserController');
const router = express.Router()


router.post('/registration',registration)
router.get('/login',login)





module.exports = router ;