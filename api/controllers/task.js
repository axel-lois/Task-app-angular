const { Task, User } = require("../models/index");

const createTask = async (req, res) => {
  try {
    let { UserId } = req.params;
    UserId = Number(UserId);
    const { title, description } = req.body;
    if (!UserId || !title || !description) {
      return res.status(400).send({ error: "Missing data." });
    }
    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }
    const task = await Task.create({
      title,
      description,
      UserId,
    });
    res.send({ successMsg: "Task created", data: task });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;
    let { UserId, id } = req.params;
    UserId = Number(UserId);
    id = Number(id);
    if (!title || !id || !description || isCompleted === undefined || !UserId) {
      console.log(title, id,description, isCompleted,UserId);
      return res.status(400).send({ error: "Missing parameters." });
    }
    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }
    const task = await Task.findOne({ where: { id, UserId } });
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    await task.update({ title, description, isCompleted });
    res.send({ successMsg: "Task succesfully updated", data: task });
  } catch (error) {}
};

const deleteTask = async (req, res) => {
  try {
    let { UserId, id } = req.params;
    id = Number(id);
    UserId = Number(UserId);
    if (!id || !UserId) {
      return res.status(400).send({ error: "Missing parameter." });
    }
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }
    const task = await Task.findOne({ where: { id, UserId } });
    if (!task) {
      return res.status(404).send({ error: "Task not found." });
    }
    await task.destroy();
    res.send({ successMsg: "Task succesfully deleted." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    let { id, UserId } = req.params;
    UserId = Number(UserId);
    id = Number(id);
    if (!UserId || !id) {
      return res.status(400).send({ error: "Missing required parameter" });
    }
    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const task = await Task.findOne({ where: { id, UserId } });
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send({ successMsg: "Task found.", data: task });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    let { UserId } = req.params;
    UserId = Number(UserId);
    if (!UserId) {
      return res.status(400).send({ error: "Missing UserId" });
    }
    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const tasks = await Task.findAll({ where: { UserId } });
    if (!tasks) {
      return res.status(404).send({ error: "No tasks found." });
    }
    res.send({ successMsg: "Tasks", data: tasks });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getAllTasks,
};
