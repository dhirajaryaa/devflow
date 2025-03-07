import AsyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { Task } from '../models/task.model.js';

const createTask = AsyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate, tags, subTasks } =
    req.body;
  // check empty filed
  if (
    !(
      (title && description) ||
      status ||
      priority ||
      dueDate ||
      tags ||
      subTasks
    )
  ) {
    throw new ApiError(400, 'All Fields are Required!');
  }
  // create new task
  const newTask = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    tags: [],
    subTasks,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, 'Task created Successful', newTask));
});

const getAllTasks = AsyncHandler(async (req, res) => {
  const tasks = await Task.find().limit(10);

  return res
    .status(200)
    .json(new ApiResponse(200, 'All Tasks Fetched :)', tasks));
});

const getTask = AsyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    throw new ApiError(400, 'Task Id Invalid!');
  }
  const task = await Task.findById(taskId);

  return res.status(200).json(new ApiResponse(200, 'Task Fetched!', task));
});

export { createTask, getAllTasks,getTask };
