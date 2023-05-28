const express = require("express");
const router = express.Router();
const {
  createCategories,
  findCategories,
  findCategoriesList,
  updateCategories,
  deleteCategories,
} = require("../controllers/books/categoriesController");
const { requireSignIn, isAdmin } = require("../middleware/Authentication");


router.post("/createCategories", requireSignIn, isAdmin, createCategories);
router.get("/findCategories/:id", requireSignIn, findCategories);
router.get("/findCategoriesList", requireSignIn, findCategoriesList);
router.post("/updateCategories/:id", requireSignIn, isAdmin, updateCategories);
router.get("/deleteCategories/:id", requireSignIn, isAdmin, deleteCategories);

module.exports = router;
