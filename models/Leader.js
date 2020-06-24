const mongoose = require("mongoose");

const studentDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
});

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
  grade: {
    type: String,
  },
});

const leaderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
  },
  students: [studentDataSchema],
  assignments: [assignmentSchema],
});

module.exports = mongoose.model("Leader", leaderSchema);
