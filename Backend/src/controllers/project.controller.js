import AsyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { Project } from '../models/project.model.js';

const createProject = AsyncHandler(async (req, res) => {
  const { title, description, milestone } = req.body;
  // check empty filed
  if (!(title || description || milestone)) {
    throw new ApiError(400, 'All Fields are Required!');
  }
  // create new task
  const projectExists = await Project.findOne({ title });
  if (projectExists) {    
    return res
    .status(200)
    .json(new ApiResponse(201, 'Project Already Exists', projectExists));
  }
  const newProject = await Project.create({
    title,
    description: description || '',
    milestone,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, 'Project created Successful', newProject));
});


export { createProject };
