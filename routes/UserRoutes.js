const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  findUserData,
  updateUser,
  deleteUser,
  findUserList,
  updateIsAdmin,
  updateUserImage,
} = require("../controllers/users/UserController");

const { requireSignIn, isAdmin } = require("../middleware/Authentication");

router.post("/registration", registration);
router.post("/login", login);
router.get("/findUserData", requireSignIn, findUserData);
router.get("/findUserList/:id", requireSignIn, findUserList);
router.post("/updateUser/:id", requireSignIn, updateUser);
router.post("/updateUserImage/:id", requireSignIn, updateUserImage);
router.get("/deleteUser/:id", requireSignIn, isAdmin, deleteUser);
router.get("/findUserList/", requireSignIn, findUserList);

router.post("/updateIsAdmin/:id", requireSignIn, isAdmin, updateIsAdmin);

module.exports = router;
