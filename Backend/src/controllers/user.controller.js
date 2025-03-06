import AsyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const generateAccessAndRefreshToken = async (user) => {
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, username, password, role } = req.body;

  // check filed not empty
  if (!(name && email && username && password && role)) {
    throw new ApiError(400, 'All Fields are required! :) ');
  }
  // check user exists or not
  const userExits = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (userExits) {
    throw new ApiError(403, 'user already exists! :) ');
  }
  // check avatar file present or not
  const avatarLocalFilePath = req.files.avatar[0];
  if (!avatarLocalFilePath) {
    throw new ApiError(400, 'Avatar Filed is Required!) ');
  }
  const avatar = await uploadOnCloudinary(avatarLocalFilePath.path);

  const newUser = await User.create({
    name,
    email,
    username,
    password,
    role,
    avatar: { url: avatar.url, public_id: avatar.public_id },
  });

  const user = await User.findById(newUser._id).select(
    '-password -refreshToken'
  );

  return res
    .status(200)
    .json(new ApiResponse(201, 'User Register successful :) ', user));
});

const loginUser = AsyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // check filed not empty
  if (!(email || username)) {
    throw new ApiError(400, 'All Fields are required! :) ');
  }
  // check user exists or not
  const userExits = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!userExits) {
    throw new ApiError(404, 'user not found!) ');
  }
  // check correct password
  const isPasswordCorrect = await userExits.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Password not Matched!) ');
  };
  // generate access and refresh token then save on db
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(userExits);

  const user = await User.findById(userExits._id).select(
    '-password -refreshToken'
  );

  const options ={
    httpOnly:true,
    secure:true
  }

  return res
    .status(200)
    .cookie('accessToken',accessToken,options)
    .cookie('refreshToken',refreshToken,options)
    .json(new ApiResponse(200, 'User Login successful :) ', {
      user: user,accessToken,refreshToken
    }));
});

export { registerUser, loginUser };
