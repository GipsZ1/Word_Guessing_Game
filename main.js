const answerLen = 5;
const letters = document.querySelectorAll('.scoreboard-letter');
let currentGuess = ""; // Tracks the current guess
let currentRow = 0; // Tracks the current row
let wordOfToday = ""; // Word of the day from the API

// Fetch the word of the day from an API
async function fetchWord() {
    const response = await fetch("https://words.dev-apis.com/word-of-the-day");
    const data = await response.json();
    wordOfToday = data.word.toUpperCase();
}
// Start the game by fetching the word
fetchWord();

// Event listener for key presses
document.addEventListener('keydown', function(e) {
    const key = e.key;
    if (isLetter(key)) { // If the key is a valid letter
        addLetter(key.toUpperCase()); // Add the letter
    } else if (key === "Enter") { // If the Enter key is pressed
        commit(); // Submit the guess
    } else if (key === 'Backspace') { // If the Backspace key is pressed
        removeLetter(); // Remove the last letter
    } else {
        console.log("Invalid Letter:", key); // If an invalid key is pressed
    }
});

// Function to check if a key is a valid letter (A-Z or a-z)
function isLetter(key) {
    return /^[a-zA-Z]$/.test(key);
}

function addLetter(letter) {
    if (currentGuess.length < answerLen) { // Only add if there’s room (5 letters max)
        currentGuess += letter; // Append the letter to the current guess
        const index = currentRow * answerLen + currentGuess.length - 1; // Calculate the correct box to fill
        letters[index].textContent = letter; // Add the letter to the grid
    }
}

function removeLetter() {
    if (currentGuess.length > 0) {
        const index = currentRow * answerLen + currentGuess.length - 1;
        letters[index].textContent = "";
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    }
}

// Function to handle the "Enter" key press and validate the guess
function commit() {
    if (currentGuess.length === answerLen) {
        const wordPart = wordOfToday.split('');
        const guessPart = currentGuess.split('');

        // First pass: Check for correct letters in the correct position
        for (let i = 0; i < answerLen; i++) {
            if (guessPart[i] === wordPart[i]) { // If the letter matches the correct position
                letters[currentRow * answerLen + i].classList.add('correct'); // Add the correct class for styling
                wordPart[i] = null; // Mark this letter as used in wordParts
            }
        }

        // Second pass: Check for correct letters in the wrong position
        for (let i = 0; i < answerLen; i++) {
            if (guessPart[i] !== wordPart[i] && wordPart.includes(guessPart[i])) {
                letters[currentRow * answerLen + i].classList.add('close'); // Add the close class for styling
                wordPart[wordPart.indexOf(guessPart[i])] = null; // Mark this letter as used
            } else if (!wordPart.includes(guessPart[i]) && !letters[currentRow * answerLen + i].classList.contains('correct')) {
                letters[currentRow * answerLen + i].classList.add('wrong'); // Add the wrong class for styling
            }
        }

        if (currentGuess === wordOfToday) {
            alert("You win! The word was: " + wordOfToday); // Display win message
        } else { // Move to the next row
            currentRow++;
            currentGuess = ''; // Reset current guess

            if (currentRow === 6) {
                alert('You lose! The word was: ' + wordOfToday); // Display lose message
            }
        }
    } else {
        console.log('Guess is incomplete. Keep typing');
    }
}
