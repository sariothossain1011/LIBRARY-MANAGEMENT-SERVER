// exports.deleteServices = async (Request, DataModel) => {
//   try {
//     let DeleteID = Request.params.id;
//     let QueryObject = {};
//     QueryObject["_id"] = DeleteID;

//     const data = await DataModel.findById(QueryObject);
//     if (!data) return { status: "fail", message: "Invalid" };

//     let Delete = await DataModel.findByIdAndDelete(QueryObject);
//     return { status: "success", delete: Delete };
//   } catch (error) {
//     return { status: "fail", data: error.toString() };
//   }
// };



const deleteServices = async (Request, DataModel) => {
  try {
    let DeleteID = Request.params.id;

    const data = await DataModel.findById(DeleteID);
    if (!data) return { status: "fail", message: "Invalid" };

    let Delete = await DataModel.findByIdAndDelete(DeleteID);
    return { status: "success", delete: Delete };
  } catch (error) {
  return { status: "fail", message: "An error occurred", error: error.message };
}
};