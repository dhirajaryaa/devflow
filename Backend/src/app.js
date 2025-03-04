import express from "express";
import cors from "cors";

const app = express();

// setup middleware
app.use(express.json());

app.use(express.urlencoded());

app.use(
  cors({
    origin: "*", // allow any url request
    methods: "get,post,put,delete",
  })
);

export default app;
