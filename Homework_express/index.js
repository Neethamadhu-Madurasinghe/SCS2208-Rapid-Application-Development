const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text11: "world"});
});

const studentRouter = require("./routers/students.js");
app.use("/students", studentRouter);


app.listen(5000);