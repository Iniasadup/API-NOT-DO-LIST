import express from "express";
const app = express();
const PORT = 8000;

// middlewares
app.use(express.json());

// routers
import taskRouter from "./src/routers/taskRouter.js";

app.use("/api/v1/task", taskRouter);

//handle all uncaught router request
app.use("*", (req, res, next) => {
  const error = {
    code: 404,
    message: "404 Page Not Found!",
  };
  next(error);
});

// global error handeler
app.use((error, req, res, next) => {
  const statusCode = error.code || 500;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});

