const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const BookSchema = new mongoose.Schema(
  {
    coverImage: {
      type: String,
      default:
        "https://res.cloudinary.com/db8l1ulfq/image/upload/v1682591922/user-profile_tfugwz.png",
    },
    bookTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    author: {
      type: String,
    },
    publicationDate: {
      type: String,
    },
    publisher: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: String,
    },
    borrowed: {
      type: String,
      default: "0",
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: false, versionKey: false }
);

const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;
