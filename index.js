const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MONGOOSE SETUP HERE
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("Db Connected");
  }
);

// ROUTES
const authRoutes = require("./routes/authRoutes");
app.use("/api/user", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the student view API");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on " + port);
});
