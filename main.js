const letters = document.querySelectorAll(".scoreboard-letter");
let currentGuess = "";
let wordOfToday = "";
const answerLen = 5;

async function fetchWord() {
  const response = await fetch("https://words.dev-apis.com/word-of-the-day");
  const data = await response.json();
  wordOfToday = data.word.toUpperCase();
}
fetchWord();

document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (isLetter(key)) {
    addLetter(key.toUpperCase());
  } else if (key === "Enter") {
    valid();
  } else {
    console.log("Invalid Letter:", key);
  }
});

function isLetter(key) {
  return /^[a-zA-Z]$/.test(key);
}

function addLetter(letter) {
  if (currentGuess.length < answerLen) {
    currentGuess += letter;
    const letterPosition = letters[currentGuess.length - 1];
    letterPosition.textContent = letter;
  }
}

function valid() {
  const guessLetters = currentGuess.split("");
  const todayLetters = wordOfToday.split("");

  guessLetters.forEach((letter, i) => {
    if (letter === todayLetters[i]) {
      letters[i].classList.add("correct");
    } else if (currentGuess.length < answerLen) {
      alert("need to complete this with 5 letters");
    }
  });
  guessLetters.forEach((letter, i) => {
    if (todayLetters.includes(letter)) {
      if (!letters[i].classList.contains("correct")) {
        letters[i].classList.add("close");
      }
    } else {
      letters[i].classList.add("wrong");
    }
  });
}
