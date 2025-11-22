const Task = require("../models/Task");

// GET all tasks
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate(
      "assignedContact",
      "firstName lastName email"
    );
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// GET task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedContact",
      "firstName lastName email"
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// POST new task
exports.createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

// PUT update task
exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// DELETE task
exports.deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};
