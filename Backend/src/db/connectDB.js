import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstant = mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log("Database connected ", connectionInstant);
  } catch (error) {
    console.error("Database connection Error: ", error);
    throw new Error("Database connection Error", error);
    process.exit(1);
  }
};

export default connectDB;