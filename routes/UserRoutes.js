const express = require('express');
const { registration, login, findUser, updateUser, deleteUser, findUserList } = require('../controllers/users/UserController');
const router = express.Router()


router.post('/registration',registration)
router.get('/login',login)
router.get('/findUser/:id',findUser)
router.get('/findUserList/:id',findUserList)
router.post('/updateUser/:id',updateUser)
router.get('/deleteUser/:id',deleteUser)
router.get('/findUserList/',findUserList)

module.exports = router ;