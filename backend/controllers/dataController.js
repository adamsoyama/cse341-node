const Data = require("../models/Data");

// Controller to get the professional profile
const getProfessionalProfile = async (req, res) => {
  try {
    const profile = await Data.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

module.exports = { getProfessionalProfile };
