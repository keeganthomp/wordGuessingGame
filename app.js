const express = require("express");
const app = express();
const mustachExpress = require("mustache-express");
const fs = require("fs");
const port = process.env.PORT || 9000;
const session = require("express-session");
const bodyParser = require("body-parser");
const sessionConfig = require("./sessionConfig");

const words = fs
  .readFileSync("/usr/share/dict/words", "utf-8")
  .toLowerCase()
  .split("\n");

//set view engine
app.engine("mustache", mustachExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//middleware
app.use("/", express.static("./views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

app.get("/", function(req, res) {
  var randomWord = words[Math.floor(Math.random() * words.length)];
  console.log("randomWord", randomWord);
  var randomWordArray = randomWord.split("");
  var dashedArray = [];
  var guessedLetter = "";
  for (i = 0; i < randomWordArray.length; i++) {
    randomWordArray[i] = "_";
    dashedArray.push(randomWordArray[i]);
  }

  res.render("index", {
    computerWord: dashedArray,
    guessedLetter: guessedLetter,
    guessCount: guessCount
  });
});

app.post("/", function(req, res) {
  var guessCount = 8;
  userGuess = req.body;
  if (
    userGuess.guessedLetter.length > 1 ||
    userGuess.guessedLetter.length <= 0
  ) {
    return res.redirect("/");
  } else if (randomWord.indexOf(userGuess.guessedLetter >= 0)) {
    guessedLetter = userGuess.guessedLetter;
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] == letter) {
        dashedArray[i] = letter;
      }
    }
    guessCount -= 1;
    console.log("guess counter:", guessCount);
    if (guessCount <= 0) {
      guessCount = 8;
      return res.render("index");
    }
    return res.redirect("/");
  } else if (computerWord.indexOf("_") == -1) {
    res.redirect("/winner");
  }
});

app.get("/winner", function(req, res) {
  res.render("winner");
});

app.listen(port, function() {
  console.log("Application is running on", port);
});
