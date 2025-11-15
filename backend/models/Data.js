const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  professionalName: String,
  base64Image: String,
  nameLink: {
    firstName: String,
    url: String,
  },
  primaryDescription: String,
  summaryText: String,
  workDescription1: String,
  workDescription2: String,
  skills: [String],
  linkTitleText: String,
  linkedInLink: {
    text: String,
    link: String,
  },
  githubLink: {
    text: String,
    link: String,
  },
});

module.exports = mongoose.model("Data", dataSchema);
