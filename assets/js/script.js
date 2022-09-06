// Word bank for game
const words = ["string", "javascript", "function", "object", "method", "iteration", "array"];
// Current word 
let currentWord = "";
// Blanks for a word
let wordBlanks = [];
// Game timer
let gameTimer;
// Time left for game
let secLeft = 0;
// Gets score from local storage or defaults to 0
let noOfWins = localStorage.getItem("noOfWins") || 0;
let noOfLosses = localStorage.getItem("noOfLosses") || 0;



// Gets the DOM elements
let startButton = document.getElementById("start");
let gameArea = document.getElementById("game");
let timerDisplay = document.getElementById("timerDisplay");
let wins = document.getElementById("wins");
let losses = document.getElementById("losses");

// Event handler for Start game button
startButton.addEventListener("click", startGame);
document.addEventListener("keydown", checkKeyPress);

init();

// Displays the score when page is loaded
function init() {
    wins.textContent = noOfWins;
    losses.textContent = noOfLosses;
}

// Starts the game
function startGame() {
    wordBlanks = [];
    wordBlanks = getWordAndInitialBlanks();
    gameArea.textContent = wordBlanks.join(" ");

    secLeft = 10;
    startTimer();
}

// Gets the word for current game and number of blanks to be displayed
function getWordAndInitialBlanks() {
    // Gets the current word randomly
    let index = Math.floor(Math.random() * words.length);
    currentWord = words[index];

    for (let i = 0; i < currentWord.length; i++)
    {
        wordBlanks.push("_");
    }

    return wordBlanks;
}

// Starts the timer for each game
function startTimer()
{
    gameTimer = setInterval(function() {
        timerDisplay.textContent = secLeft;
        if (secLeft > 0) {   
            secLeft--;
        }
        else {
            clearInterval(gameTimer);
            // Stop game and display the  results
            secLeft = 0;
            gameArea.textContent = "GAME OVER";
            noOfLosses++;
            // Sets the losses in local storage
            localStorage.setItem("noOfLosses", noOfLosses);
            losses.textContent = noOfLosses;
        }
    }, 1000); 
}

// Checks whether pressed key is present
function checkKeyPress(event) {
    // Returns if timer is not runnuing
    if (secLeft === 0) {
        return;
    }

    // Access value of pressed key with key property
    let key = event.key.toLowerCase();
    const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

    // Checks whether the key is an alphabet and also the chosen word contains the key
    if(alphabets.includes(key) && currentWord.includes(key)) {
        // Replaces the blank with the letter for each occurance of the key in the chosen word
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === key) {
                wordBlanks[i] = key;
            }
        }

        gameArea.textContent = wordBlanks.join(" ");
    }

    // If user guessed all letters correctly
    if(wordBlanks.indexOf("_") === -1) {
        // Stop timer and display success message
        clearInterval(gameTimer);
        secLeft = 0;
        gameArea.textContent = "YOU WON!!!";
        noOfWins++;
        // Sets the wins in local storage
        localStorage.setItem("noOfWins", noOfWins);
        wins.textContent = noOfWins;
    }
}
