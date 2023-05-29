exports.ListServices = async (req, DataModel) => {
  try {
    const data = await DataModel.find();
    const count = data.length; // Counting the number of users

    if (count === 0) {
      return { success: "fail", message: "Not found user category!" };
    } else {
      return { success: "success", count: count, data: data };
    }
  } catch (error) {
    return { success: "fail", data: error.toString() };
  }
};
