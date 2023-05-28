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
      return res.status(400).json({
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

    const token = await CreateToken({id:data._id});
    const { password: removedPassword, ...responseData } = data.toObject();
    res
      .status(200)
      .json({ status: "success", token: token, data: responseData });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.findUser = async (req, res) => {
  try {
    const data = await UserModel.findById(req.params.id).select("-password");
    if (!data) {
      res
        .status(400)
        .json({ success: "fail", message: "The user is not found" });
    } else {
      res.status(200).json({ success: "success", data: data });
    }
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.findUserList = async (req, res) => {
  try {
    const data = await UserModel.find().select("-password -isAdmin");
    const count = data.length; // Counting the number of users
    
    if (count === 0) {
      res.status(400).json({ success: "fail", message: "Not found user list!" });
    } else {
      res.status(200).json({ success: "success", count: count, data: data });
    }
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const postBody = req.body;
    const data = await UserModel.findByIdAndUpdate(req.params.id, postBody, {
      new: true,
    }).select("-password -isAdmin");
    if (!data) {
      return res
        .status(404)
        .send({ success: "fail", message: "Update fail !" });
    }
    res.status(200).json({ success: "success", data: data });
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const data = await UserModel.findById(req.params.id);
    if (!data) return res.status(400).send("Invalid User");

    await UserModel.findByIdAndDelete(req.params.id).then((data) => {
      if (data) {
        return res
          .status(200)
          .send({ success: "success", message: "User is deleted!" });
      } else {
        return res
          .status(400)
          .send({ success: "fail", message: "User delete fail!" });
      }
    });
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.updateIsAdmin = async (req, res) => {
  const id = req.params.id;
  const isAdmin = req.body.isAdmin;
  const existUser = await UserModel.findOne({ id });
    if (existUser) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }

  UserModel.findByIdAndUpdate(id, { $set: { isAdmin: isAdmin } }, { new: true })
    .then((UpdateIsAdmin) => {
      res.status(200).json(UpdateIsAdmin);
    })
    .catch((error) => {
      return res.status(400).json({ success: false, message: error });
    });
};
