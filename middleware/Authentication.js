const jwt = require("jsonwebtoken");
const UserModel = require("../models/users/UserModel");

exports.RequireSignIn = (req, res, next) => {
  try {
    let tmp = req.header("Authorization");
    const token = tmp && tmp.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.IsAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    // console.log(user)
    if (user.isAdmin !== true) {
      return res.status(401).send("Unauthorized Admin");
    } else {
      next();
    }
  } catch (err) {
    console.log(err)
  }
};
