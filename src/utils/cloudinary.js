import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const cloudinaryUploader = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Delete file from local storage after successful upload
    fs.unlinkSync(localFilePath);

    console.log("File uploaded to Cloudinary:", response.secure_url);

    return response.secure_url;
  } catch (error) {
    // Clean up local file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary uploader error:", error.message);
    throw error;
  }
};
