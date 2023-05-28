const mongoose = require("mongoose");
const BookModel = require("../../models/books/BookModel");
const CategoriesModel = require("../../models/books/CategoryModel");

exports.addBook = async (req, res) => {
  try {
    const {
      categoryID,
      bookTitle,
      description,
      author,
      publicationDate,
      publisher,
      quantity,
    } = req.body;

    // validation
    switch (true) {
      case !categoryID?.trim():
        return res.json({ error: "categoryID is required" });
      case !bookTitle?.trim():
        return res.json({ error: "Book Title is required" });
      case !description?.trim():
        return res.json({ error: "Description is required" });
      case !author?.trim():
        return res.json({ error: "Author is required" });
      case !publicationDate?.trim():
        return res.json({ error: "publicationDate is required" });
      case !publisher?.trim():
        return res.json({ error: "publisher is required" });
      case !quantity?.trim():
        return res.json({ error: "quantity is required" });
    }

    const category = await CategoriesModel.findById(req.body.categoryID);
    if (!category) return res.status(400).send("Invalid Category");

    const existBook = await BookModel.findOne({
      bookTitle: req.body.bookTitle,
    });
    if (existBook) {
      return res.status(400).json({
        status: "fail",
        message: "This Book already exist. Try another one.",
      });
    }

    // create product
    const data = new BookModel({ ...req.body });
    await data.save();
    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "success", data: error.toString() });
  }
};

exports.findBook = async (req, res) => {
  try {
    const data = await BookModel.findById(req.params.id).populate("categoryID");
    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "Not Book found ",
      });
    } else {
      res.status(200).json({ success: "success", data: data });
    }
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.findBookList = async (req, res) => {
  try {
    const data = await BookModel.find().populate("categoryID");
    const count = data.length; // Counting the number of users
    
    if (count === 0) {
      res.status(400).json({ success: "fail", message: "Not found user book!" });
    } else {
      res.status(200).json({ success: "success", count: count, data: data });
    }
  } catch (error) {
    return res.status(400).json({ status: "success", data: error.toString() });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const postBody = req.body;

    const category = await CategoriesModel.findById(req.body.categoryID);
    if (!category) {
      return res.status(400).send("Invalid Category ID");
    }

    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return res.status(400).send("Invalid Book ID");
    }

    const data = await BookModel.findByIdAndUpdate(req.params.id, postBody, {
      new: true,
    });
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

exports.deleteBook = async (req, res) => {
  try {
    const data = await BookModel.findById(req.params.id);
    if (!data) return res.status(400).send("Invalid Book");

    await BookModel.findByIdAndDelete(req.params.id).then((data) => {
      if (data) {
        return res
          .status(200)
          .send({ success: "success", message: "Book is deleted!" });
      } else {
        return res
          .status(400)
          .send({ success: "fail", message: "Book delete fail!" });
      }
    });
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};
