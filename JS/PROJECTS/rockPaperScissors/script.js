// declare choise as an array: ["rock", "paper", "scissors"]
const choices = ['rock', 'paper', 'scissors'];

// Player should choise from list ‘Rock’, ‘Paper’ or ‘Scissors’.
// Create a select element
const selectElement = document.createElement('select');
// Add options to the dropdown list
choices.forEach((choice) => {
  const option = document.createElement('option');
  option.value = choice;
  option.text = choice.charAt(0).toUpperCase() + choice.slice(1); // Capitalize the first letter
  selectElement.appendChild(option);
});
// Add the select element to the document body
document.body.appendChild(selectElement);
// Add a button to get the player's selection
const button = document.createElement('button');
button.textContent = 'Paspausk';
button.addEventListener('click', getPlayerSelection);
document.body.appendChild(button);

function getPlayerSelection() {
  const selectedOption = selectElement.value;
  const playerSelection = selectedOption;

  // Generate a new computer selection each time the function is called
  const computerSelection = choices[Math.floor(Math.random() * choices.length)];

  // Add string in web with players choice after player push submit button
  const playerChoice = document.body.appendChild(document.createElement('p'));
  playerChoice.textContent = 'Player selected: ' + playerSelection;

  // Add string in web with computer choice after player push submit button
  const computerChoice = document.body.appendChild(document.createElement('p'));
  computerChoice.textContent = 'Computer selected: ' + computerSelection;
}

// Or via prompt player can add playerSelection by string
// So make shure it's case-insensitive, users can input rock, ROCK, RocK or any other variation.
// function playerSelection () {
//     selectElement = document.querySelector(options);
//     output = selectElement.value;
//    }

// playRound function should take two parameters - the playerSelection and computerSelection
// computerSelection should return new value then playerSelection changed
// Then compare them and return a string that declares the winner. E. g. like so: "You Lose! Paper beats Rock"
function playRound(playerSelection, computerSelection) {}

// This function play a five round game that keeps score.
// And reports a winner or loser at the end.
playGame()