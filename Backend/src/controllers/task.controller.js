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

const updateTask = AsyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, priority, dueDate, tags, subTasks } =
    req.body;
  // check empty filed
  if (
    !(title || description || status || priority || dueDate || tags || subTasks)
  ) {
    throw new ApiError(400, 'All Fields are Required!');
  }
  // checked empty task id
  if (!taskId) {
    throw new ApiError(400, 'Task Id Invalid!');
  }

  const task = await Task.findById(taskId);
  const updateTask = await Task.findByIdAndUpdate(
    task._id,
    {
      title: title || task.title,
      description: description || task.description,
      status: status || task.status,
      priority: priority || task.priority,
      dueDate: dueDate || task.dueDate,
      tags: tags || task.tags,
      subTasks: subTasks || task.subTasks,
    },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, 'Task updated', updateTask));
});

const deleteTask = AsyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    throw new ApiError(400, 'Task Id Invalid!');
  }
  await Task.findByIdAndDelete(taskId);

  return res.status(200).json(new ApiResponse(200, 'Task Deleted'));
});

const changeTaskStatus = AsyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!taskId) {
    throw new ApiError(400, 'Task Id Invalid!');
  }
  const task = await Task.findById(taskId);
  const updateTask = await Task.findByIdAndUpdate(
    task._id,
    {
      status: status || task.status,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, 'Task Status updated', updateTask));
});

export { createTask, getAllTasks, getTask, updateTask, deleteTask,changeTaskStatus };
