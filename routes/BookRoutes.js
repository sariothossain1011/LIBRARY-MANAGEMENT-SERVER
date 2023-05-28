const express = require('express');
const { addBook, findBook, findBookList, updateBook, deleteBook } = require('../controllers/books/BookController');
const router = express.Router()

router.post('/addBook',addBook)
router.get('/findBook/:id',findBook)
router.get('/findBookList',findBookList)
router.post('/updateBook/:id',updateBook)
router.get('/deleteBook/:id',deleteBook)


module.exports = router ;