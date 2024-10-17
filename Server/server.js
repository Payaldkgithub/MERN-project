import express from "express";
import morgan from "morgan";
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); //morgen(http logger)

//demoAPI
app.get("/", (req, res) => {
  res.send("SERVER AT WORK");
});
const PORT = 4000;
const hostname = "localhost";

app.listen(PORT, hostname, () => {
  console.log(`app is running on http://${hostname}:${PORT}`);
});
