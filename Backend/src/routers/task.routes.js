import {Router} from 'express';
import {AuthorizeUser} from '../middlewares/auth.middleware.js'
import { createTask, getAllTasks, getTask } from '../controllers/task.controller.js';

export const  taskRouter = Router();

// task routes

taskRouter.post('/',AuthorizeUser,createTask); // create new task
taskRouter.get('/',AuthorizeUser,getAllTasks); // get all task
taskRouter.get('/:taskId',AuthorizeUser,getTask); // get single task

