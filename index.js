const express = require("express");
const app = express();
const dotenv = require("dotenv");
app.use(express.json());
const cors = require("cors");
app.use(cors());
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
app.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params._id;
    const allDatas = await User.find({});
    const temp = [...allDatas];
    const index = temp.findIndex((i) => i._id === id);
    temp.splice(index, 1, req.body);
    console.log("EDITED", req.body);
    res.json(req.body);
  } catch (error) {
    console.log(error);
  }
});
app.delete("/remove/:id", async (req, res) => {
  try {
    const id = req.params._id;
    const allDatas = await User.find({});
    const temp = [...allDatas];
    const index = temp.findIndex((i) => i._id === id);
    temp.splice(index, 1);
    res.send(req.body);
    console.log("DELETED", req.body);
  } catch (error) {
    console.log(error);
  }
});
