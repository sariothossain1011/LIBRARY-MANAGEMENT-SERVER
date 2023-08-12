const BookModel = require("../../models/books/BookModel");
const BorrowItemsModel = require("../../models/books/BorrowItems");
const BorrowModel = require("../../models/books/BorrowModel");
const UserModel = require("../../models/users/UserModel");
const { deleteServices } = require("../../services/common/DeleteServices");
const {
  FindSingleItemServices,
} = require("../../services/common/FindSingleItemServices");
const { ListServices } = require("../../services/common/ListServices");


exports.borrowRequest = async (req, res) => {
  try {
    const { bookID, userID } = req.body;

    // Validation
    switch (true) {
      case !bookID?.trim():
        return res.json({ error: "bookID is required" });
      case !userID?.trim():
        return res.json({ error: "userID is required" });
    }

    const book = await BookModel.findById(bookID);
    if (!book) {
      return res.status(400).send("Invalid bookID");
    }

    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(400).send("Invalid userID");
    }

    const existBook = await BorrowModel.findOne({
      bookID: bookID,
    });
    if (existBook) {
      return res.status(400).json({
        status: "fail",
        message: "This book is already borrowed. Try another one.",
      });
    }

    // Create borrow request
    const borrow = new BorrowModel({ bookID, userID });

    // Save the borrow request
    const savedBorrow = await borrow.save();

    // Populate bookID and userID fields
    const populatedBorrow = await BorrowModel.findById(savedBorrow._id)
      .populate("bookID")
      .populate("userID");

    return res.status(200).json({ status: "success", data: populatedBorrow });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.toString() });
  }
};

exports.findBorrow = async (req, res) => {
  const data = await FindSingleItemServices(req, BorrowModel);
  return res.status(200).json(data);
};

exports.findBorrowList = async (req, res) => {
  const data = await ListServices(req, BorrowModel);
  return res.status(200).json(data);
};

exports.findBorrowItems = async (req, res) => {
  const data = await ListServices(req, BorrowItemsModel);
  return res.status(200).json(data);
};

exports.updateBorrowStatus = async (req, res) => {
  try {
    const status = req.body.status;

    const category = await UserModel.findById(req.body.userID);
    if (!category) {
      return res.status(400).send("Invalid userID");
    }

    const book = await BookModel.findById(req.body.bookID);
    if (!book) {
      return res.status(400).send("Invalid BookID");
    }

    if (status === "approved") {
      // Increase the borrow value by 1
      book.borrowed = (parseInt(book.borrowed) + 1).toString();
      const borrowItems = await new BorrowItemsModel({bookID:req.body.bookID,userID:req.body.userID});
      await borrowItems.save()
    } else if (status === "return") {
      // Decrease the borrow value by 1
      if (parseInt(book.borrowed) > 0) {
        book.borrowed = (parseInt(book.borrowed) - 1).toString();
      }
    }

    const updatedBook = await book.save();
    if (!updatedBook) {
      return res.status(404).send({ success: "fail", message: "Update fail!" });
    }

    const data = await BorrowModel.findByIdAndUpdate(req.params.id,{status:status}, {
      new: true,
    });
    console.log({data})
    if (!data) {
      return res.status(404).send({ success: "fail", message: "Update fail!" });
    }

    res.status(200).json({ success: "success", data: data });
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.deleteBorrow = async (req, res) => {
  const data = await deleteServices(req, BorrowModel);
  return res.status(200).json(data);
};

exports.statusList = async (req, res) => {
  try {
    const { status } = req.params;
    const data = await BorrowModel.find({ status: { $eq: status } });
    const count = data.length; // Counting the number of users

    if (count === 0) {
      res
        .status(400)
        .json({ success: "fail", message: "Not found user borrow!" });
    } else {
      res.status(200).json({ success: "success", count: count, data: data });
    }
  } catch (error) {
    return res.status(400).json({ status: "success", data: error.toString() });
  }
};




exports.allUserBorrow = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await BorrowModel.find({ userID : { $eq: id } });
    const count = data.length; // Counting the number of users

    if (count === 0) {
      res
        .status(400)
        .json({ success: "fail", message: "Not found user borrow!" });
    } else {
      res.status(200).json({ success: "success", count: count, data: data });
    }
  } catch (error) {
    return res.status(400).json({ status: "success", data: error.toString() });
  }
};