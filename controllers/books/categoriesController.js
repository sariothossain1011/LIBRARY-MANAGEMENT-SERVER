const { default: mongoose } = require("mongoose");

const BookModel = require("../../models/books/BookModel");
const CategoriesModel = require("../../models/books/CategoryModel");
const {
  CheckAssociateService,
} = require("../../services/common/CheckAssociateService");
const { deleteServices } = require("../../services/common/DeleteServices");
const {
  FindSingleItemServices,
} = require("../../services/common/FindSingleItemServices");
const { ListServices } = require("../../services/common/ListServices");

exports.createCategories = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.json({ error: "category is required" });
    }
    const existCategories = await CategoriesModel.findOne({
      category: req.body.category,
    });
    if (existCategories) {
      return res.status(400).json({
        status: "fail",
        message: "This categories already exist. Try another one.",
      });
    }
    const data = await new CategoriesModel({ category }).save();

    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "success", data: error.toString() });
  }
};

exports.findCategories = async (req, res) => {
  const data = await FindSingleItemServices(req, CategoriesModel);
  return res.status(200).json(data);
};

exports.findCategoriesList = async (req, res) => {
  const data = await ListServices(req, CategoriesModel);
  return res.status(200).json(data);
};

exports.updateCategories = async (req, res) => {
  try {
    const postBody = req.body;
    const data = await CategoriesModel.findByIdAndUpdate(
      req.params.id,
      postBody,
      {
        new: true,
      }
    );
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

exports.deleteCategories = async (req, res) => {
  const DeleteID = req.params.id;
  let CheckAssociate = await CheckAssociateService(
    { categoryID: new mongoose.Types.ObjectId(DeleteID) },
    BookModel
  );
  if (CheckAssociate) {
    return res
      .status(200)
      .json({ status: "associate", data: "Associated with Book" });
  } else {
    const data = await deleteServices(req, CategoriesModel);
    return res.status(200).json(data);
  }
};

