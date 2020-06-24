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
        res.status.send("Error adding student.");
      }
      return res.json(doc);
    }
  );
});

module.exports = router;
