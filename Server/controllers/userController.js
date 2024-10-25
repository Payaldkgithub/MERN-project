import userModel from "../models/userModel.js";
import { createHashPassword } from "../utils/bcrypt.js";
import { createToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/bcrypt.js";
export const userSignup = async (req, res) => {
  try {
    let user = req.body;
    let { firstName, email, password } = user;

    if (firstName && email && password) {
      let hashPassword = await createHashPassword(password);
      let userData = new userModel({ ...user, password: hashPassword });
      let response = await userData.save();
      let token = createToken({ id: response._id });
      return res.status(201).send({ token });
    } else {
      return res.status(400).send({ error: "Provide All Fields" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error", msg: error.message });
  }
};
export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (email && password) {
      const user = await userModel.findOne({ email });
      if (user) {
        //compare password logic
        const isMatched = await comparePassword(password, user.password);
        console.log(isMatched);
        if (isMatched) {
          let token = createToken({ id: user._id });
          return res.status(200).send({ message: "Login SuccessFul", token });
        }
      } else {
        return res.status(400).send({ error: "User not authorized" });
      }
    } else {
      return res.status(400).send({ error: "Provide All fields" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal Server Error", error: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const { id } = req;
    const userData = await userModel.findById(id, {
      _id: 0,
      __v: 0,
      password: 0,
    });
    return res.status(200).send(userData);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error", msg: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req;
    const data = req.body;
    delete data.password;
    delete data.email;
    const response = await userModel.findByIdAndUpdate(id, {
      $set: { ...data },
    });
    return res.status(200).send({ message: "User Data Updated" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error", msg: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req;
    const response = await userModel.findByIdAndDelete(id);
    if (response) {
      return res
        .status(200)
        .send({ message: "User deleted SuccessFully", success: true });
    } else {
      return res.status(400).send({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error", msg: error.message });
  }
};

