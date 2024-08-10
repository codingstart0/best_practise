// ROCK PAPER SCISSORS

const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
let playerScore = 0;
let computerScore = 0;

function playGame(playerChoise){

const computerChoise = choices[Math.floor(Math.random() * 3)];
let result = "";

if(playerChoise === computerChoise){
    result = "IT'S A TIE!";
}
else{
    switch(playerChoise){
        case "rock":
           result = (computerChoise === "scissors") ? "YOU WIN!" : "YOU LOSE!";
            break;
        case "paper":
            result = (computerChoise === "rock") ? "YOU WIN!" : "YOU LOSE!";
            break;
        case "scissors":
            result = (computerChoise === "paper") ? "YOU WIN!" : "YOU LOSE!";
            break;
    }
}

playerDisplay.textContent = `PLAYER: ${playerChoise}`;
computerDisplay.textContent = `COMPUTER: ${computerChoise}`;
resultDisplay.textContent = result;

resultDisplay.classList.remove("greenText", "redText", "blueText");

switch(result){
    case "IT'S A TIE!":
        resultDisplay.classList.add("blueText");
        break;
    case "YOU WIN!":
        resultDisplay.classList.add("greenText");
        playerScore ++;
        playerScoreDisplay.textContent = playerScore;
        break;
    case "YOU LOSE!":
        resultDisplay.classList.add("redText");
        computerScore ++;
        computerScoreDisplay.textContent = computerScore;
        break;
}
}