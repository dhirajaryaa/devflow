import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

export const userRouter = Router();

// user routes
userRouter.post("/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerUser
);
