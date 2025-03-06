import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { AuthorizeUser } from '../middlewares/auth.middleware.js';

export const userRouter = Router();

// user routes
userRouter.post(
  '/register',
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  registerUser
);

userRouter.post('/login', loginUser);

userRouter.post('/logout', AuthorizeUser, logoutUser);
