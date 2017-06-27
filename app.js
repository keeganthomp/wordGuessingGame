const express = require("express");
const app = express();
const mustachExpress = require("mustache-express");
const entryRoutes = require("./routes/entryRoutes");
const fs = require("fs");
const port = process.env.PORT || 4000;
const session = require("express-session");
const bodyParser = require("body-parser");
const sessionConfig = require("./sessionConfig");

const words = fs
  .readFileSync("/usr/share/dict/words", "utf-8")
  .toLowerCase()
  .split("\n");
var randomWord = words[Math.floor(Math.random() * words.length)];
console.log("randomWord", randomWord);
var randomWordArray = randomWord.split("");
var dashedArray = [];
var guessedLetter = "";
var userGuesses = [];
var errorMessage = "";
createDashedArray();

function createDashedArray() {
  for (i = 0; i < randomWordArray.length; i++) {
    dashedArray.push("_");
  }
  // dashedArray = dashedArray.join("  ");
}

function replaceDashWithLetter(letter) {
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] == letter) {
      dashedArray[i] = letter;
    }
  }
}

//set view engine
app.engine("mustache", mustachExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//middleware
app.use("/", express.static("./public"));
app.use("/", entryRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));



app.post("/again", function(req, res) {
  randomWord = words[Math.floor(Math.random() * words.length)];
  randomWordArray = randomWord.split("");
  dashedArray = [];
  guessedLetter = "";
  userGuesses = [];
  errorMessage = "";
  guessCount = 8;
  createDashedArray();
  res.redirect("/");
});

app.post("/error", function(req, res){
  errorMessage = "";
  res.redirect("/");  
})

app.listen(port, function() {
  console.log("Application is running on", port);
});
