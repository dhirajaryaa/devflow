import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB
  .then(() => {
    app.listen(
      (process.env.PORT || 3000,
      () => {
        console.log(
          "Express Server running on Port :",
          process.env.PORT || 3000
        );
      })
    );
  })
  .catch((error) => {
    console.error("Database connection Error: ", error);
    process.exit(1);
  });
