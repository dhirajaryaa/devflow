import {Router} from 'express';
import {AuthorizeUser} from '../middlewares/auth.middleware.js'
import { createProject, getAllProjects, getProjectById, updateProject } from '../controllers/project.controller.js';

export const projectRouter = Router();

projectRouter.post('/', AuthorizeUser,createProject);
projectRouter.get('/', AuthorizeUser,getAllProjects);
projectRouter.get('/:projectId', AuthorizeUser,getProjectById);
projectRouter.put('/:projectId', AuthorizeUser,updateProject);