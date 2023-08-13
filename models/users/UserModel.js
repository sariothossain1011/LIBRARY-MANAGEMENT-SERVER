const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/db8l1ulfq/image/upload/v1682591922/user-profile_tfugwz.png",
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    category: {
      type: String,
    },
    roll: {
      type: String,
    }
    ,
    department: {
      type: String,
    },
    semester: {
      type: String,
    },
    session:{
      type:String,
    },
    mobile: {
      type: String,
    },
    gender: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    createdDate:{
      type:Date,
      default:Date.now(),
    }
  },
  { timestamps: false, versionKey: false }
);

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;