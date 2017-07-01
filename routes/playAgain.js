const express = require("express");
const playAgain = express.Router();
const data = require("../data/data");


playAgain.post("/", function(req, res) {
  data.randomWord = data.word[Math.floor(Math.random() * data.word.length)];
  data.randomWordArray = data.randomWord.split("");
  data.dashedArray = [];
  data.guessedLetter = "";
  data.userGuesses = [];
  data.errorMessage = "";
  data.guessCount = 8;
  res.redirect("/");
});



module.exports = playAgain;
