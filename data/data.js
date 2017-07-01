const express = require("express");
const data = express.Router();
const fs = require("fs");


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
  // dashedArray = dashedArray.join("");
}

function replaceDashWithLetter(letter) {
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] == letter) {
      dashedArray[i] = letter;
    }
  }
}

module.exports = {
  data: data,
  word: words,
  randomWord: randomWord,
  randomWordArray: randomWordArray,
  dashedArray: dashedArray,
  guessedLetter: guessedLetter,
  userGuesses: userGuesses,
  errorMessage: errorMessage,
  createDashedArray: createDashedArray,
  replaceDashWithLetter: replaceDashWithLetter
};
