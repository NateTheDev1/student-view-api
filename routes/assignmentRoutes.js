const router = require("express").Router();
const Assignment = require("../models/Assignment");
const Leader = require("../models/Leader");
const User = require("../models/User");

// New Assignment
// Expect a leaderId, a student id to find, and the assignment
router.post("/:leaderId", async (req, res) => {
  const student = await User.findOne({ _id: req.body.studentId });

  if (!student) {
    return res.status(400).send("Student not found.");
  }

  const assignment = new Assignment({
    name: req.body.name,
    updatedAt: req.body.updatedAt,
    studentId: student._id,
    leaderId: req.params.leaderId,
    grade: req.body.grade,
  });

  try {
    const savedAssignment = await assignment.save();

    res.send(savedAssignment);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:leaderId", async (req, res) => {
  Assignment.findOneAndUpdate(
    { leaderId: req.params.leaderId },
    {
      $set: {
        name: req.body.name,
        grade: req.body.grade,
        updatedAt: req.body.updatedAt,
      },
    },
    (err, doc) => {
      if (err) {
        return res.status(400).send("Error updating assignment");
      }
      return res.json(doc);
    }
  );
});

module.exports = router;
