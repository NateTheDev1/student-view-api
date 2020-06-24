const router = require("express").Router();
const Assignment = require("../models/Assignment");
const Leader = require("../models/Leader");
const User = require("../models/User");

router.post("/student", async (req, res) => {
  const newStudent = {
    name: req.body.name,
    studentId: req.body.studentId,
  };
  Leader.findOneAndUpdate(
    { _id: req.body.leaderId },
    { $push: { students: newStudent } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).send("Error adding student.");
      }
      return res.json(doc);
    }
  );
});

router.put("/student", async (req, res) => {
  const leader = await Leader.findOne({ _id: req.body.leaderId });
  const students = leader.students;

  const newStudents = students.map((s) => {
    if (s.studentId == req.body.studentId) {
      const newStudent = {
        name: req.body.name,
        studentId: req.body.studentId,
      };
      return newStudent;
    } else {
      return s;
    }
  });

  Leader.findOneAndUpdate(
    { _id: req.body.leaderId },
    { $set: { students: newStudents } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).send("Error updating student.");
      }
      return res.json(doc);
    }
  );
});

router.delete("/student", async (req, res) => {
  const leader = await Leader.findOne({ _id: req.body.leaderId });
  const students = leader.students;

  const newStudents = students.filter((s) => {
    return s.studentId !== req.body.studentId;
  });

  Leader.findOneAndUpdate(
    { _id: req.body.leaderId },
    { $set: { students: newStudents } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).send("Error deleting student.");
      }
      return res.json(doc);
    }
  );
});

module.exports = router;
