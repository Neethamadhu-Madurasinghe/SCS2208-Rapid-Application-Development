const students = require("../data/studentData.json")

const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.render("index", students[req.params.id]);
});


  
module.exports =  router;