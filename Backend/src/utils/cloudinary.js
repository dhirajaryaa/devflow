import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });

    fs.unlinkSync(filePath);
    return response

  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};

const destroyOnCloudinary = async (publicId) => {
  if (!publicId) return null;
  await cloudinary.uploader.destroy(publicId);
  return null;
};

export { uploadOnCloudinary, destroyOnCloudinary };
