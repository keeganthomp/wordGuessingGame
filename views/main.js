(function showError() {
    var error = document.querySelector(".error");
    var gotItBtn = document.querySelector("#confirm");
    var game = document.querySelector(".game");
    if(error.innerHTML != ""){
        gotItBtn.classList.remove("hidden");
        game.classList.add("hidden");
    }
})();

(function replaceCommas() {
    var randomWord = document.querySelector(".randomWord").innerHTML;
    randomWord.replace(",", " ");
    console.log(randomWord);
    // console.log(typeOf(randomWord.innerHTML));
})();