import express from "express";
import userModel from "../models/userModel.js";
const userRouter = express.Router();
//Apis
//demo
userRouter.get("/", (req, res) => {
  res.send("user router is working");
});

userRouter.get("/all", async (req, res) => {
  //verirying user collection
  let allUsers = await userModel.find();
  res.status(200).send(allUsers);
});
export default userRouter;
