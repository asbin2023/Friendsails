require("dotenv").config();
const cors = require("cors");

const authM = require("./middlewares/authM");

const express = require("express");

const connectMongo = require("./mongoConfig");

connectMongo();

const app = express();
app.use(cors());
app.use(express.json({ limit: "9mb" }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", require("./routers/userRoutes"));
app.use("/user/posts", authM, require("./routers/postRoutes"));
app.use("/user/posts/comments", authM, require("./routers/commentRoutes"));
app.use("/user/profile", authM, require("./routers/userProfileRoutes"));

app.get("/secret", authM, (req, res) => {
  console.log(req.id);
  console.log(req.username);
  console.log(req.body);
  res.send("this is the secret route!");
});

app.listen(process.env.PORT, console.log("running on: ", process.env.PORT));
