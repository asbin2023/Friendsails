require("dotenv").config();
const cors = require("cors");
const User = require("./models/userModel");

const authM = require("./middlewares/authM");

const express = require("express");

const connectMongo = require("./mongoConfig");

connectMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", require("./routers/userRoutes"));

// app.get("/secret", authM, (req, res) => {
//   res.send("this is the secret route!");
// });

app.listen(process.env.PORT, console.log("running on: ", process.env.PORT));
