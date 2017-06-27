const express = require("express");
const entryRouts = express.Router();
const data = require("../data/data");
const bodyParser = require("body-parser");


entryRouts.use(bodyParser.urlencoded({ extended: false }));


entryRouts.get("/", function(req, res) {
  if (data.randomWordArray.toString() === data.dashedArray.toString()) {
    return res.render("winner", { randomWord: data.randomWord });
  }
  res.render("index", {
    computerWord: data.dashedArray,
    guessedLetter: data.guessedLetter,
    guessCount: data.guessCount,
    userGuess: data.userGuesses,
    errorMessage: data.errorMessage,
    randomWord: data.randomWord
  });
});

var guessCount = 8;

entryRouts.post("/", function(req, res) {
  userGuess = req.body;
  console.log("req Body:", req.body);
  if (data.userGuesses.indexOf(userGuess.guessedLetter) >= 0) {
    data.errorMessage =
      "You already guessed '" +
      data.userGuess.guessedLetter +
      "', guess a different letter";
  } else if (data.randomWord.indexOf(userGuess.guessedLetter) >= 0) {
    guessedLetter = userGuess.guessedLetter;
    for (let i = 0; i < data.randomWordArray.length; i++) {
      if (data.randomWordArray[i] == guessedLetter) {
        data.dashedArray[i] = guessedLetter;
      }
    }
    data.userGuesses.push(guessedLetter);
    guessCount -= 1;
  } else if (
    userGuess.guessedLetter.length > 1 ||
    userGuess.guessedLetter.length <= 0 ||
    userGuess.guessedLetter.indexOf(" ") >= 0
  ) {
    data.errorMessage =
      "You may only guess one letter at a time. No spaces. No Numbers";
    return res.redirect("/");
  } else if ((userGuess.guessedLetter.length = 1)) {
    guessCount -= 1;
    data.userGuesses.push(userGuess.guessedLetter);
  }
  if (guessCount <= 0) {
    guessCount = 8;
    data.errorMessage = "You ran out of guesses.";
    return res.render("fail", {
      randomWord: data.randomWord,
      errorMessage: data.errorMessage
    });
  }

  res.redirect("/");
});


module.exports = entryRouts;