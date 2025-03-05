import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: [
      {
        url: String,
        public_id: String,
      },
    ],
    projects: [
      {
        type: mongoose.Collection.objectId,
        ref: 'Project',
      },
    ],
    userStatus: {
      type: String,
      default: 'Coding 🧑‍💻',
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// use middleware 'pre' before run password save
userSchema.pre('save', async function (next) {
  if (!this.isModified(password)) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// custom function for checking correct password
userSchema.method.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// custom function for generate accessToken
userSchema.method.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// custom function for generate refreshToken
userSchema.method.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export default User = mongoose.model('User', userSchema);
