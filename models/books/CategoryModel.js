const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: false, versionKey: false }
);

const CategoriesModel = mongoose.model("categories", CategoriesSchema);
module.exports = CategoriesModel;
