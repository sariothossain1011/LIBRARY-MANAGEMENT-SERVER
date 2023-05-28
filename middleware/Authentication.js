const jwt = require("jsonwebtoken");
const UserModel = require("../models/users/UserModel");

exports.requireSignIn = (req, res, next) => {
  try {
    let tmp = req.header("Authorization");
    const token = tmp && tmp.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded["data"];
    next();
  } catch (error) {
    res.status(500).json({ status: "fail", data: error.toString() });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (user.isAdmin !== true) {
    return res.status(401).send({message :"Unauthorized Admin"});
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ status: "fail", data: error.toString() });
  }
};
