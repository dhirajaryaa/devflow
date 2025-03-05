import AsyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

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
    '-password -accessToken'
  );

  return res
    .status(200)
    .json(new ApiResponse(200, 'User Register successful :) ', user));
});

export { registerUser };
