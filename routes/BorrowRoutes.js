const express = require("express");
const router = express.Router();
const {
  borrowRequest,
  findBorrow,
  findBorrowList,
  deleteBorrow,
  updateBorrowStatus,
  statusList,
  findBorrowItems,
  allUserBorrow,
} = require("../controllers/books/BorrowController");
const { requireSignIn, isAdmin } = require("../middleware/Authentication");

router.post("/borrowRequest", requireSignIn, borrowRequest);
router.get("/findBorrow/:id", requireSignIn, findBorrow);
router.get("/findBorrowList", requireSignIn, findBorrowList);

router.get("/findBorrowItems", requireSignIn, findBorrowItems);

router.post(
  "/updateBorrowStatus/:id",
  requireSignIn,
  isAdmin,
  updateBorrowStatus
);
router.get("/deleteBorrow/:id", requireSignIn, deleteBorrow);
router.get("/statusList/:status",requireSignIn, statusList); // request/approved/cancelled/return

router.get("/allUserBorrow/:userID",requireSignIn, allUserBorrow);

module.exports = router;
