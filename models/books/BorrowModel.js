const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema(
  {
    bookID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status:{
      type:String,
      default:"pending"
    },
    createdDate:{
        type:Date,
        default:Date.now(),
      }
  },
  { timestamps: false, versionKey: false }
);

const BorrowModel = mongoose.model("borrow", BorrowSchema);
module.exports = BorrowModel;
