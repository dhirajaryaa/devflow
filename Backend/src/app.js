import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// setup middleware
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("./public"));

app.use(
  cors({
    origin: '*', // allow any url request
    methods: 'get,post,put,delete',
  })
);

app.use(cookieParser()); // ✅ Parses incoming cookies

// routes middlewares setup
import  {userRouter}  from './routers/user.routes.js';
import { taskRouter } from './routers/task.routes.js';
import { projectRouter } from './routers/project.routes.js';
// for users related all routes handle
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/projects', projectRouter);

export default app;
