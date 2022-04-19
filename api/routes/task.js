const express = require("express");
const {
  getTask,
  getAllTasks,
  deleteTask,
  updateTask,
  createTask,
} = require("../controllers/task");
const taskRouter = express.Router();

taskRouter.get("/tasks/:UserId", getAllTasks);

taskRouter.get("/tasks/:UserId/:id", getTask);

taskRouter.put("/tasks/:UserId/:id", updateTask);

taskRouter.post("/tasks/:UserId", createTask);

taskRouter.delete("/tasks/:UserId/:id", deleteTask);

module.exports = taskRouter;
