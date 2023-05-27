const { hashPassword, comparePassword } = require("../../helper/HashPassword");
const UserModel = require("../../models/users/UserModel");
const CreateToken = require("../../utility/CreateToken");

exports.registration = async (req, res) => {
  try {
    const { name, department, roll, email, mobile, password } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!department) {
      return res.json({ error: "Email is required" });
    }
    if (!roll) {
      return res.json({ error: "Email is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!mobile) {
      return res.json({ error: "Mobile is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    const existUser = await UserModel.findOne({ email: req.body.email });
    if (existUser) {
      return res
        .status(400)
        .json({
          status: "fail",
          message: "This email already exist. Try another one.",
        });
    }

    const hashedPassword = await hashPassword(password);

    const data = await new UserModel({
      name,
      department,
      roll,
      email,
      mobile,
      password: hashedPassword,
    }).save();

    const { password: removedPassword, ...responseData } = data.toObject();

    return res.status(400).json({ status: "success", data: responseData });
  } catch (error) {
    return res.status(400).json({ status: "success", data: error.toString() });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email is required!" });
    }
    if (!password || password.length < 6) {
      return res.json({
        status: "fail",
        message: "Password must be at least 6 characters long",
      });
    }

    const data = await UserModel.findOne({ email });
    if (!data) {
      res.status(400).json({ status: "fail", message: "User not found!" });
    }

    const passwordMatch = await comparePassword(password, data.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ status: "fail", message: "Wrong password !" });
    }

    const token = await CreateToken(data);
    const { password: removedPassword, ...responseData } = data.toObject();
    res
      .status(200)
      .json({ status: "success", token: token, data: responseData });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error.toString() });
  }
};
