const express = require("express");
const app = express();
const mustachExpress = require("mustache-express");
const port = process.env.PORT || 9000;
const session = require("express-session");
const bodyParser = require("body-parser");

var users = [];

//set view engine
app.engine("mustache", mustachExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//middleware
app.use("/", express.static("./views"));
app.use(bodyParser.urlencoded({ extended: false }));
function checkAuth(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}