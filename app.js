const express = require("express");
const app = express();
const mustachExpress = require("mustache-express");
const fs = require('fs')
const port = process.env.PORT || 9000;
const session = require("express-session");
const bodyParser = require("body-parser");
const sessionConfig = require("./sessionConfig");


const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

//set view engine
app.engine("mustache", mustachExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//middleware
app.use("/", express.static("./views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));
function checkAuth(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

app.get("/", function(req, res) {
  res.render("index");
});

app.listen(port, function() {
  console.log("Application is running on", port);
});
