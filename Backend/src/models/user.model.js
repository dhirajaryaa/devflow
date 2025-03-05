import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      index: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "",
    },
    projects: [
      {
        type: mongoose.Collection.objectId,
        ref: "Project",
      },
    ],
    userStatus: {
      type: String,
      default: "Coding 🧑‍💻",
    },
  },
  { timestamps: true }
);

export default User = mongoose.model("User", userSchema);
