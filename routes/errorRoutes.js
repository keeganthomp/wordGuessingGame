const express = require("express");
const errorRoutes = express.Router();
const data = require("../data/data");


errorRoutes.post("/", function(req, res){
  data.errorMessage = "";
  res.redirect("/");  
});


module.exports = errorRoutes;