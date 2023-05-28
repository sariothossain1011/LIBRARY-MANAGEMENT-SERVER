const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    category: {
      type: String,
    },
    category: {
      type: String,
    },
    category: {
      type: String,
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
