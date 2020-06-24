const router = require("express").Router();
const User = require("../models/User");
const Leader = require("../models/Leader");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/leaders", async (req, res) => {
  const leaders = await Leader.find();
  if (!leaders) {
    res.status(400).send("An error occured retrieving leaders");
  }
  res.status(200).send(leaders);
});

router.get("/students", async (req, res) => {
  const students = await User.find();
  if (!students) {
    res.status(400).send("An error occured retrieving students");
  }
  res.status(200).send(students);
});

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
      return res.status(400).send(error);
    }
  } else if (req.params.type === "student") {
    const salt = await bcrypt.genSalt(10);

    const hashed = await bcrypt.hash(req.body.password, salt);

    const leader = await Leader.findOne({ name: req.body.leaderName });

    if (!leader) {
      return res.status(400).send("Leader Not Found.");
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      role: "Student",
      teamLeader: leader._id,
      leaderName: req.body.leaderName,
    });
    try {
      const savedStudent = await user.save();
      const token = await jwt.sign(
        { _id: savedStudent._id },
        process.env.TOKEN_KEY
      );
      res.header("Authorization", token).send({ ...savedStudent._doc, token });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).send("Please select a valid role.");
  }
});

router.post("/login/:type", async (req, res) => {
  if (req.params.type === "leader") {
    const leader = await Leader.findOne({ email: req.body.email });

    if (!leader) {
      return res.status(400).send("Email or password is incorrect.");
    }

    const valid = await bcrypt.compare(req.body.password, leader.password);
    if (!valid) {
      return res.status(400).send("Email or password is incorrect.");
    }

    const token = await jwt.sign({ _id: leader._id }, process.env.TOKEN_KEY);
    res.header("Authorization", token).send({ ...leader._doc, token });
  } else if (req.params.type === "student") {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send("Email or password is incorrect.");
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(400).send("Email or password is incorrect.");
    }

    const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
    res.header("Authorization", token).send({ ...user._doc, token });
  } else {
    res.status(400).send("Please declare a valid role.");
  }
});
module.exports = router;
