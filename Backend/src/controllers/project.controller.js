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

const getAllProjects = AsyncHandler(async (req, res) => {
  const projects = await Project.find();
  return res.status(200).json(new ApiResponse(200, 'All Projects', projects));
});

const getProjectById = AsyncHandler(async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    throw new ApiError(400, 'Project Id is Required');
  }
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project Not Found');
  }
  return res.status(200).json(new ApiResponse(200, 'Project', project));
});

const updateProject = AsyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { title, description, milestone, owner, member, tasks } = req.body;
  if (!projectId) {
    throw new ApiError(400, 'Project Id is Required');
  }
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project Not Found');
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      title: title || project.title,
      description: description || project.description,
      milestone: milestone || project.milestone,
      owner: owner || project.owner,
      member: member || project.member,
      tasks: tasks || project.tasks,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, 'Project Updated', updatedProject));
});

export { createProject, getAllProjects, getProjectById, updateProject };
