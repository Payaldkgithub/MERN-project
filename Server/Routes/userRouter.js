import express from "express";
import userModel from "../models/userModel.js";
import { forgotpassword } from "../controllers/otpController.js";
import {
  userSignup,
  loginController,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../Middleware/jwt.js";
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
//user Registration
userRouter.post("/signup", userSignup);
export default userRouter;

//user Login
userRouter.post("/login", loginController);
userRouter.get("/auth", verifyToken, getUser);
userRouter.put("/update", verifyToken, updateUser);
userRouter.delete("/delete", verifyToken, deleteUser);
userRouter.post("/forgotpassword",forgotpassword);

