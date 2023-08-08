
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmqu5abqn", //YOUR_CLOUD_NAME
  api_key: "521159663879513", //YOUR_API_KEY
  api_secret: "hQHaYrVEQrB6kqcBc88opqNPxeg", //YOUR_API_SECRET
});

const CloudinaryImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    if (!result.url) {
      throw new Error("Image Upload failed");
    }
    return result.url;
  } catch (error) {
    throw new Error("Image Upload failed: " + error.toString());
  }
};

module.exports = CloudinaryImage;










// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "dmqu5abqn", //YOUR_CLOUD_NAME
//   api_key: "521159663879513", //YOUR_API_KEY
//   api_secret: "hQHaYrVEQrB6kqcBc88opqNPxeg", //YOUR_API_SECRET
// });

// const CloudinaryImage = async (req) => {
//   try {
//     const file = req.files.photo;
//     const { url } = cloudinary.uploader.upload(file.tempFilePath);
//     if (!url) {
//       return res.json({ error: "Image Upload fail", data: error.toString() });
//     }
//     return await url;
//   } catch (error) {
//     return res.json({ error: "Image Upload fail", data: error.toString() });
//   }
// };

// module.exports = CloudinaryImage;
