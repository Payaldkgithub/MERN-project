import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;
export const createToken = (data) => {
  try {
    return jwt.sign(data, secretKey);
  } catch (error) {
    throw new Error("Error in JWT converting");
  }
};
