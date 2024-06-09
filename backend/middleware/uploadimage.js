import dotenv from "dotenv";
import multer from "multer";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const storage = multer.diskStorage({});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, async error => {
    try {
      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
        req.cloudinaryImageUrl = uploadResult.secure_url;
      }
      next();
    } catch (error) {
      return next(error);
    }
  });
};
export default uploadImage;
