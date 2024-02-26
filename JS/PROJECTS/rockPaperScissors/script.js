// declare choise as an array: ["rock", "paper", "scissors"]
const choices = ['rock','paper', 'scissors'];


// Play game  The function should take two parameters - the playerSelection and computerSelection
// And return a string that declares the winner. E. g. like so: "You Lose! Paper beats Rock"
function playRound(playerSelection, computerSelection) {
}


// Player should choise from list ‘Rock’, ‘Paper’ or ‘Scissors’.
// Or via prompt player can add playerSelection by string 
// So make shure it's case-insensitive, users can input rock, ROCK, RocK or any other variation.
const playerSelection = prompt


// Computer should randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’. 
const computerSelection = choices[Math.floor(Math.random() * choices.length)];

console.log (computerSelection)
