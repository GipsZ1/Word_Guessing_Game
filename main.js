const letters = document.querySelectorAll('.scoreboard-letter');
let currentGuess = ""; 
let wordOfToday = ""; 
const answerLen = 5;

async function fetchWord() {
    const response = await fetch("https://words.dev-apis.com/word-of-the-day");
    const data = await response.json();
    wordOfToday = data.word.toUpperCase();
}
fetchWord();

document.addEventListener('keydown', function(e) {
    const key = e.key;
    if (isLetter(key)) { 
        addLetter(key.toUpperCase());
    } else if (key === "Enter") {
        valid();
    }else{
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
    if (currentGuess === wordOfToday) {
        letters.forEach(letter => {
            letter.classList.add('correct'); 
        });
    } else {
        letters.forEach(letter => {
            letter.classList.add('wrong'); 
        });
    }
}

