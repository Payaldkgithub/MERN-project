import express from "express";
import morgan from "morgan";
import cors from "cors";
import dbConnect from "./db/dbConfig.js";
import dotenv from "dotenv";
import userRouter from "./Routes/userRouter.js";
dotenv.config();

const app = express();

//middlewares
app.use(express.json()); //json parser
app.use(express.urlencoded({ extended: true })); //url data parser
app.use(morgan("dev")); //morgan(http logger)
app.use(cors({ origin: "http://localhost:5173" })); //cross server access

//demoAPI
app.get("/", (req, res) => res.send({ message: "SERVER AT WORK" }));

app.use("/user", userRouter);

//listen
const PORT = process.env.PORT || 4000;
const hostname = process.env.HOST_ADD || "localhost";
app.listen(PORT, hostname, () => {
  console.log(`server running in http://${hostname}:${PORT}`);
  dbConnect();
});
