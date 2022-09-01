const words = ["string", "javascript", "function", "object", "method", "iteration", "array"];
let currentWord = "";
let gameTimer;

let startButton = document.getElementById("start");
let gameArea = document.getElementById("game");

startButton.addEventListener("click", startGame);

function startGame() {
    let wordBlanks = getWordAndInitialBlanks();
    gameArea.textContent = wordBlanks;

    gameTimer = setTimeout(startTimer, 10000);
    startTimer();
}

function getWordAndInitialBlanks() {
    let index = Math.floor(Math.random() * words.length);
    currentWord = words[index];

    let wordBlanks = "";
    for (let i = 0; i < currentWord.length; i++)
    {
        wordBlanks += "_ ";
    }

    return wordBlanks;
}

function startTimer()
{
    
}
