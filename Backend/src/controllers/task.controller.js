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

export { createTask };
