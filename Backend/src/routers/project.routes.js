import {Router} from 'express';
import {AuthorizeUser} from '../middlewares/auth.middleware.js'
import { createProject } from '../controllers/project.controller.js';

export const projectRouter = Router();

projectRouter.post('/', AuthorizeUser,createProject);