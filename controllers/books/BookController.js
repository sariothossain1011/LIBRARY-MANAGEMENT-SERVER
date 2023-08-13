const mongoose = require("mongoose");
const BookModel = require("../../models/books/BookModel");
const CategoriesModel = require("../../models/books/CategoryModel");
const { deleteServices } = require("../../services/common/DeleteServices");
const { ListServices } = require("../../services/common/ListServices");
const {
  FindSingleItemServices,
} = require("../../services/common/FindSingleItemServices");
const BorrowModel = require("../../models/books/BorrowModel");
const {
  CheckAssociateService,
} = require("../../services/common/CheckAssociateService");
const CloudinaryImage = require("../../utility/CloudinaryImage");

exports.addBook = async (req, res) => {
  try {
    // const photo = await CloudinaryImage(req.files.photo);
    const {
      photo,
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
      case !photo?.trim():
        return res.json({ error: "Photo is required" });
      case !categoryID?.trim():
        return res.json({ error: "CategoryID is required" });
      case !bookTitle?.trim():
        return res.json({ error: "Book Title is required" });
      case !description?.trim():
        return res.json({ error: "Description is required" });
      case !author?.trim():
        return res.json({ error: "Author is required" });
      case !publicationDate?.trim():
        return res.json({ error: "PublicationDate is required" });
      case !publisher?.trim():
        return res.json({ error: "Publisher is required" });
      case !quantity?.trim():
        return res.json({ error: "Quantity is required" });
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
    const data = new BookModel({...req.body });
    await data.save();
    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.findBook = async (req, res) => {
  const data = await FindSingleItemServices(req, BookModel);
  return res.status(200).json(data);
};

exports.findBookList = async (req, res) => {
  const data = await ListServices(req, BookModel);
  return res.status(200).json(data);
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

exports.updateBookImage = async (req, res) => {
  try {
    const url = await CloudinaryImage(req.files.photo);

    const data = await BookModel.findByIdAndUpdate(
      req.params.id,
      { photo: url },
      {
        new: true,
      }
    );
    res.status(200).json({ success: "Image uploaded", imageUrl: url });
  } catch (error) {
    res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.deleteBook = async (req, res) => {
  const DeleteID = req.params.id;
  let CheckAssociate = await CheckAssociateService(
    { bookID: new mongoose.Types.ObjectId(DeleteID) },
    BorrowModel
  );
  if (CheckAssociate) {
    return res
      .status(200)
      .json({ status: "associate", data: "Associated with Borrow" });
  } else {
    const data = await deleteServices(req, BookModel);
    return res.status(200).json(data);
  }
};
