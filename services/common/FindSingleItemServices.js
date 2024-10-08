exports.FindSingleItemServices = async (Request, DataModel) => {
  try {
    const data = await DataModel.findById(Request.params.id);
    if (!data) {
      return { success: "fail", message: "Not found " };
    } else {
      return { success: "success", data: data };
    }
  } catch (error) {
    return { success: "fail", data: error.toString() };
  }
};
