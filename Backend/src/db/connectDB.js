import mongoose from "mongoose";

const connectDB = async () => {
  try {    
     await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log("Database connected ");
  } catch (error) {
    console.error("Database connection Error: ", error);
    process.exit(1);
  }
};

export default connectDB;