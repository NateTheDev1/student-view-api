const router = require("express").Router();
const User = require("../models/User");
const Leader = require("../models/Leader");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/leader/:id", async (req, res) => {
  const leader = await Leader.findOne({ _id: req.params.id });
  if (!leader) {
    res.status(400).send("Leader not found");
  }
  res.status(200).send(leader);
});

router.get("/student/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(400).send("Student not found");
  }
  res.status(200).send(user);
});

router.post("/register/:type", async (req, res) => {
  if (req.params.type === "leader") {
    const salt = await bcrypt.genSalt(10);

    const hashed = await bcrypt.hash(req.body.password, salt);

    const leader = new Leader({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      role: "Team Leader",
    });
    try {
      const savedLeader = await leader.save();
      const token = await jwt.sign(
        { _id: savedLeader._id },
        process.env.TOKEN_KEY
      );
      res.header("Authorization", token).send({ ...savedLeader._doc, token });
    } catch (error) {
      res.status(400).send(error);
    }
  } else if (req.params.type === "student") {
  } else {
    res.status(400).send("Please select a valid role.");
  }
});

module.exports = router;
