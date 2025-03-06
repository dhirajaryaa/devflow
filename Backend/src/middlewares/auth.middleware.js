import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';
import AsyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

export const AuthorizeUser = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(401, 'Unauthorize Request');
  }
  //   decode jwt token
  const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decodedToken) {
    throw new ApiError(401, 'Invalid Access Token!');
  }
  //   get user info
  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(400, 'user not found!');
  }

  req.user = user;
  next();
});
