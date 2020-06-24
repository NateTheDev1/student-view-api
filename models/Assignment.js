const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  studentId: {
    type: String,
  },
  leaderId: {
    type: String,
  },
  grade: {
    type: String,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
