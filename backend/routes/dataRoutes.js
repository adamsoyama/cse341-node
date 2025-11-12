const express = require("express");
const router = express.Router();

const { getProfessionalProfile } = require("../controllers/dataController");

// ✅ This defines GET /professional
router.get("/", getProfessionalProfile);

module.exports = router;
