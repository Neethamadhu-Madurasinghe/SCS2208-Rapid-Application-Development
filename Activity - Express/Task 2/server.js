const express = require("express");
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/successful", (req, res) => {
  res.send("Upload successful !");
});

app.post('/profile', upload.single('photo'), function (req, res, next) {
  console.log(req.file)
  res.redirect("/successful")
});

app.listen(4000);