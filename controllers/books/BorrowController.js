const BookModel = require("../../models/books/BookModel");
const BorrowModel = require("../../models/books/BorrowModel");
const UserModel = require("../../models/users/UserModel");


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
  try {
    const data = await BorrowModel.findById(req.params.id).populate("bookID").populate("userID");
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

exports.findBorrowList = async (req, res) => {
  try {
    const data = await BorrowModel.find().populate("bookID").populate("userID");
    const count = data.length; // Counting the number of users
    
    if (count === 0) {
      res.status(400).json({ success: "fail", message: "Not found user borrow!" });
    } else {
      res.status(200).json({ success: "success", count: count, data: data });
    }
  } catch (error) {
    return res.status(400).json({ status: "success", data: error.toString() });
  }
};

exports.updateBorrowStatus = async (req, res) => {
  try {
    const postBody = req.body;

    const category = await UserModel.findById(req.body.userID);
    if (!category) {
      return res.status(400).send("Invalid userID");
    }

    const book = await BookModel.findById(req.body.bookID);
    if (!book) {
      return res.status(400).send("Invalid BookID");
    }

    const data = await BorrowModel.findByIdAndUpdate(req.params.id, postBody, {
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

exports.deleteBorrow = async (req, res) => {
  try {
    const data = await BorrowModel.findById(req.params.id);
    if (!data) return res.status(400).send("Invalid Borrow");

    await BorrowModel.findByIdAndDelete(req.params.id).then((data) => {
      if (data) {
        return res
          .status(200)
          .send({ success: "success", message: "Borrow is deleted!" });
      } else {
        return res
          .status(400)
          .send({ success: "fail", message: "Borrow delete fail!" });
      }
    });
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};



exports.statusList = async (req, res) => {
  try {
    const { status } = req.params;
    const data = await BorrowModel.find({ status: { $eq: status } });
    const count = data.length; // Counting the number of users
    
    if (count === 0) {
      res.status(400).json({ success: "fail", message: "Not found user borrow!" });
    } else {
      res.status(200).json({ success: "success", count: count, data: data });
    }
  } catch (error) {
    return res.status(400).json({ status: "success", data: error.toString() });
  }
};