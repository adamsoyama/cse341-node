/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [todo, in_progress, done]
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         assignedContact:
 *           type: string
 *           description: MongoDB ObjectId referencing a Contact
 */

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validate = require("../middleware/validate");

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Joi schema for validation
const taskSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().iso().required(),
  status: Joi.string().valid("todo", "in_progress", "done").optional(),
  priority: Joi.string().valid("low", "medium", "high").optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  assignedContact: Joi.string().hex().length(24).optional(),
});

// GET all tasks
router.get("/", getTasks);

// GET task by ID
router.get("/:id", getTaskById);

// POST new task (with validation)
router.post("/", validate(taskSchema), createTask);

// PUT update task (with validation)
router.put("/:id", validate(taskSchema), updateTask);

// DELETE task
router.delete("/:id", deleteTask);

module.exports = router;
