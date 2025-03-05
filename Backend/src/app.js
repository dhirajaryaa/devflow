import express from 'express';
import cors from 'cors';

const app = express();

// setup middleware
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: '*', // allow any url request
    methods: 'get,post,put,delete',
  })
);

// routes middlewares setup
import  {userRouter}  from './routers/user.routes.js';
// for users related all routes handle
app.use('/api/v1/users', userRouter);

export default app;
