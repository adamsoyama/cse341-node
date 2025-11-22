/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         favoriteColor:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 *         phone:
 *           type: string
 *         address:
 *           type: string
 */

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validate = require("../middleware/validate");

const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// Joi schema for validation
const contactSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  favoriteColor: Joi.string().required(),
  birthday: Joi.date().iso().required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
});

// GET all contacts
router.get("/", getContacts);

// GET contact by ID
router.get("/:id", getContactById);

// POST new contact (with validation)
router.post("/", validate(contactSchema), createContact);

// PUT update contact (with validation)
router.put("/:id", validate(contactSchema), updateContact);

// DELETE contact
router.delete("/:id", deleteContact);

module.exports = router;
