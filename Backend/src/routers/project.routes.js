import {Router} from 'express';
import {AuthorizeUser} from '../middlewares/auth.middleware.js'
import { createProject, deleteProject, getAllProjects, getProjectById, updateMilestone, updateProject } from '../controllers/project.controller.js';

export const projectRouter = Router();

projectRouter.post('/', AuthorizeUser,createProject);
projectRouter.get('/', AuthorizeUser,getAllProjects);
projectRouter.get('/:projectId', AuthorizeUser,getProjectById);
projectRouter.put('/:projectId', AuthorizeUser,updateProject);
projectRouter.delete('/:projectId', AuthorizeUser,deleteProject);
projectRouter.patch('/:projectId/milestone', AuthorizeUser,updateMilestone);