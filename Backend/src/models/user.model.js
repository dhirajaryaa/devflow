import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

// use middleware 'pre' before run password save
userSchema.pre("save", async function (next) {
  if (!this.isModified(password)) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// custom function for checking correct password
userSchema.method.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};



export default User = mongoose.model("User", userSchema);
