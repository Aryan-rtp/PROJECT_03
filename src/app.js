const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("../src/routes/app.routes");
const postRouter = require("./routes/post.routes");



const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/post",postRouter)
module.exports = app;
