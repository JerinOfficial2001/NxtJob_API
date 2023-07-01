const express = require("express");
const app = express();
const dotenv = require("dotenv");
app.use(express.json());
const mongoose = require("mongoose");
dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server Started Successfully");
});
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(() => {
  console.log("DATABASE Connected");
});
require("./models/jobs");
const User = mongoose.model("job");
app.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send({ status: "ok", data: allUsers });
  } catch (error) {
    console.log(error);
  }
});
app.post("/add", async (req, res) => {
  const job = req.body;
  console.log("JOB", job);
  try {
    await User.create(job);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});
app.put("/edit/:_id", (req, res) => {
  try {
    const id = req.params._id;
    const alteredUser = [...User.job];
    const index = alteredUser.findIndex((i) => i._id === id);
    alteredUser.splice(index, 0, req.body);
    console.log("EDITED", req.body);
    res.json(alteredUser);
  } catch (error) {
    console.log(error);
  }
});
