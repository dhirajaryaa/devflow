import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import app from './app.js';
import { v2 as cloudinary } from 'cloudinary';

// environment variable configure
dotenv.config({
  path: './.env',
});

// cloudinary configure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB
  .then(() => {
    app.listen(
      (process.env.PORT || 3000,
      () => {
        console.log(
          'Express Server running on Port :',
          process.env.PORT || 3000
        );
      })
    );
  })
  .catch((error) => {
    console.error('Database connection Error: ', error);
    process.exit(1);
  });
