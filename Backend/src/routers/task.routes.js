import {Router} from 'express';
import {AuthorizeUser} from '../middlewares/auth.middleware.js'
import { changeTaskStatus, createTask, deleteTask, getAllTasks, getTask, updateTask } from '../controllers/task.controller.js';

export const  taskRouter = Router();

// task routes

taskRouter.post('/',AuthorizeUser,createTask); // create new task
taskRouter.get('/',AuthorizeUser,getAllTasks); // get all task
taskRouter.get('/:taskId',AuthorizeUser,getTask); // get single task
taskRouter.put('/:taskId',AuthorizeUser,updateTask); // update single task
taskRouter.delete('/:taskId',AuthorizeUser,deleteTask); // delete single task
taskRouter.patch('/:taskId/status',AuthorizeUser,changeTaskStatus); // change task status

