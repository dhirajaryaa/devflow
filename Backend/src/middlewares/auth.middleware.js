import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';
import AsyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

export const AuthorizeUser = AsyncHandler(async (req, res,next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized Request');
    }

    // Decode JWT token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch user from database
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(404, 'User not found!');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid or Expired Token!'));
  }
});
