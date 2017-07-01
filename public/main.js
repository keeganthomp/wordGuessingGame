(function showError() {
  var error = document.querySelector(".error");
  var gotItBtn = document.querySelector("#confirm");
  var game = document.querySelector(".game");
  var gif = document.querySelector(".mainGif");
  if (error.innerHTML != "") {
    gotItBtn.classList.remove("hidden");
    game.classList.add("hidden");
    gif.classList.add("hidden");
  }
})();

(function replaceCommas() {
  var randomWord = document.querySelector(".randomWord").innerHTML;
  randomWord.replace(",", " ");
  console.log(randomWord);
  // console.log(typeOf(randomWord.innerHTML));
})();

(function listenForLetter() {
  window.addEventListener("keypress", function(e) {
    var letter = e.key.toString();
    console.log(letter);
    axios
      .post("/", { letter: letter })
      .then(function(response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  });
})();
