const express = require("express");
const app = express();
const mustachExpress = require("mustache-express");
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
app.use("/", express.static("./views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

app.get("/", function(req, res) {
  if (randomWordArray.toString() === dashedArray.toString()) {
    return res.render("winner", { randomWord: randomWord });
  }
  res.render("index", {
    computerWord: dashedArray,
    guessedLetter: guessedLetter,
    guessCount: guessCount,
    userGuess: userGuesses,
    errorMessage: errorMessage,
    randomWord: randomWord
  });
});

var guessCount = 8;

app.post("/", function(req, res) {
  userGuess = req.body;
  if (userGuesses.indexOf(userGuess.guessedLetter) >= 0) {
    errorMessage =
      "You already guessed '" +
      userGuess.guessedLetter +
      "', guess a different letter";
  } else if (randomWord.indexOf(userGuess.guessedLetter) >= 0) {
    guessedLetter = userGuess.guessedLetter;
    for (let i = 0; i < randomWordArray.length; i++) {
      if (randomWordArray[i] == guessedLetter) {
        dashedArray[i] = guessedLetter;
      }
    }
    userGuesses.push(guessedLetter);
    guessCount -= 1;
  } else if (
    userGuess.guessedLetter.length > 1 ||
    userGuess.guessedLetter.length <= 0 ||
    userGuess.guessedLetter.indexOf(" ") >= 0
  ) {
    errorMessage =
      "You may only guess one letter at a time. No spaces. No Numbers";
    return res.redirect("/");
  } else if ((userGuess.guessedLetter.length = 1)) {
    guessCount -= 1;
    userGuesses.push(userGuess.guessedLetter);
  }
  if (guessCount <= 0) {
    guessCount = 8;
    errorMessage = "You ran out of guesses.";
    return res.render("fail", {
      randomWord: randomWord,
      errorMessage: errorMessage
    });
  }

  res.redirect("/");
});

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
