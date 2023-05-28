const CategoriesModel = require("../../models/books/CategoryModel");


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
  try {
    const data = await CategoriesModel.findById(req.params.id);
    if (!data) {
      res
        .status(400)
        .json({ success: "fail", message: "Not found categories" });
    } else {
      res.status(200).json({ success: "success", data: data });
    }
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.findCategoriesList = async (req, res) => {
  try {
    const data = await CategoriesModel.find();
    const count = data.length; // Counting the number of users
    
    if (count === 0) {
      res.status(400).json({ success: "fail", message: "Not found user category!" });
    } else {
      res.status(200).json({ success: "success", count: count, data: data });
    }
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
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
  try {
    const data = await CategoriesModel.findById(req.params.id);
    if (!data) return res.status(400).send("Invalid Categories");

    await CategoriesModel.findByIdAndDelete(req.params.id).then((data) => {
      if (data) {
        return res
          .status(200)
          .send({ success: "success", message: "Categories is deleted!" });
      } else {
        return res
          .status(400)
          .send({ success: "fail", message: "Categories delete fail!" });
      }
    });
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};
