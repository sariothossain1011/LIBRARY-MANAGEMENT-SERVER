const mongoose = require("mongoose");

const { hashPassword, comparePassword } = require("../../helper/HashPassword");
const BorrowModel = require("../../models/books/BorrowModel");
const UserModel = require("../../models/users/UserModel");
const {
  CheckAssociateService,
} = require("../../services/common/CheckAssociateService");
const { deleteServices } = require("../../services/common/DeleteServices");
const {
  FindSingleItemServices,
} = require("../../services/common/FindSingleItemServices");
const { ListServices } = require("../../services/common/ListServices");
const CreateToken = require("../../utility/CreateToken");
const CloudinaryImage = require("../../utility/CloudinaryImage");

exports.registration = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      password,
      category,
      roll,
      department,
      semester,
      mobile,
      isAdmin,
    } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!address) {
      return res.json({ error: "Address is required" });
    }
    if (!category) {
      return res.json({ error: "Category is required" });
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
      email,
      address,
      category,
      roll,
      department,
      semester,
      mobile,
      isAdmin,
      password: hashedPassword,
    }).save();

    const { password: removedPassword, ...responseData } = data.toObject();

    return res.status(200).json({ status: "success", data: responseData });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
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

    const token = await CreateToken({ id: data._id });
    const { password: removedPassword, ...responseData } = data.toObject();
    res
      .status(200)
      .json({ status: "success", token: token, data: responseData });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.findUserData = async (req, res) => {
  try {
    const data = await UserModel.findById(req.user.id);
    if (!data) {
      return { success: "fail", message: "Not found " };
    } else {
      res.status(200).json({ success: "Success", data: data });
    }
  } catch (error) {
    res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.findUserList = async (req, res) => {
  const data = await ListServices(req, UserModel);
  return res.status(200).json(data);
};

exports.updateUser = async (req, res) => {
  try {
    const postBody = req.body;
    const data = await UserModel.findByIdAndUpdate(req.user.id, postBody, {
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

exports.updateUserImage = async (req, res) => {
  try {
    const url = await CloudinaryImage(req.files.photo);

    const data = await UserModel.findByIdAndUpdate(
      req.params.id,
      { photo: url },
      {
        new: true,
      }
    );
    res.status(200).json({ success: "Image uploaded", imageUrl: data.photo });
  } catch (error) {
    res.status(400).json({ success: "fail", data: error.toString() });
  }
};



exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(400).send("Invalid User");
  
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      return res
        .status(200)
        .send({ success: true, message: "User is deleted!" });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "User delete fail!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  
}; 

exports.AdminList = async (req, res) => {
  try {
    const admin = await UserModel.find({ isAdmin: true});
    if (!admin) {
      res
        .status(500)
        .json({ success: false, message: "Not found Admin List" });
    } else {
      res.status(200).json(admin );
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
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
