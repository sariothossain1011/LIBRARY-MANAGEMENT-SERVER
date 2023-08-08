const express = require("express");
const router = express.Router();
const {
  addBook,
  findBook,
  findBookList,
  updateBook,
  deleteBook,
  updateBookImage,
} = require("../controllers/books/BookController");

const { requireSignIn, isAdmin } = require("../middleware/Authentication");

router.post("/addBook", requireSignIn, isAdmin, addBook);
router.get("/findBook/:id", requireSignIn, findBook);
router.get("/findBookList", requireSignIn, findBookList);
router.post("/updateBook/:id", requireSignIn, isAdmin, updateBook);
router.post("/updateBookImage/:id",requireSignIn, isAdmin, updateBookImage)
router.get("/deleteBook/:id", requireSignIn, isAdmin, deleteBook);

module.exports = router;
