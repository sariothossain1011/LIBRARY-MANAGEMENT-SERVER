const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    department: {
      type: String,
    },
    roll: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
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