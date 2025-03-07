import {Router} from 'express';
import {AuthorizeUser} from '../middlewares/auth.middleware.js'
import { createTask } from '../controllers/task.controller.js';

export const  taskRouter = Router();

// task routes

taskRouter.post('/',AuthorizeUser,createTask)

