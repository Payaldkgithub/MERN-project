import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;
export const verifyToken = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization.split(" ")[1];
    if (authToken) {
      try {
        const { id } = jwt.verify(authToken, secretKey);
        if (id) {
          req.id = id;
          next();
        } else {
          return res.status(400).send({ error: "User Id not valid" });
        }
      } catch (error) {
        return res.status(400).send({ error: "Token verification is failed" });
      }
    } else {
      return res.status(400).send({ error: "Authorization Token is Required" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error", msg: error.message });
  }
};
