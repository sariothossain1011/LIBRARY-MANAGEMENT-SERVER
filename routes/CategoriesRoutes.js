const express = require('express');
const { createCategories, findCategories, findCategoriesList, updateCategories, deleteCategories } = require('../controllers/books/categoriesController');
const router = express.Router()

router.post('/createCategories',createCategories)
router.get('/findCategories/:id',findCategories)
router.get('/findCategoriesList',findCategoriesList)
router.post('/updateCategories/:id',updateCategories)
router.get('/deleteCategories/:id',deleteCategories)


module.exports = router ;