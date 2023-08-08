const mongoose = require("mongoose");

const BorrowItemsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bookID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: false, versionKey: false }
);

const BorrowItemsModel = mongoose.model("borrowItems", BorrowItemsSchema);
module.exports = BorrowItemsModel;
