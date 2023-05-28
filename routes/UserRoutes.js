const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  findUser,
  updateUser,
  deleteUser,
  findUserList,
  updateIsAdmin,
} = require("../controllers/users/UserController");

const { requireSignIn, isAdmin } = require("../middleware/Authentication");

router.post("/registration", registration);
router.get("/login", login);
router.get("/findUser/:id", requireSignIn, findUser);
router.get("/findUserList/:id", requireSignIn, findUserList);
router.post("/updateUser/:id", requireSignIn, isAdmin, updateUser);
router.get("/deleteUser/:id", requireSignIn, isAdmin, deleteUser);
router.get("/findUserList/", requireSignIn, findUserList);

router.post("/updateIsAdmin/:id", requireSignIn, isAdmin, updateIsAdmin);

module.exports = router;
