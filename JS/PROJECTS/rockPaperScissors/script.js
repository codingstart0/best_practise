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
// Add the select elem ent to the document body
document.body.appendChild(selectElement);
// Add a button to get the player's selection
const button = document.createElement('button');
button.textContent = 'Paspausk';
button.addEventListener('click', playRound);
document.body.appendChild(button);

function playRound() {
  const selectedOption = selectElement.value;
  const playerSelection = selectedOption;
  // Add string in web with players choice after player push submit button
  const playerChoice = document.body.appendChild(document.createElement('p'));
  playerChoice.textContent = 'Player selected: ' + playerSelection;

  // Generate a new computer selection each time the function is called
  const computerSelection = choices[Math.floor(Math.random() * choices.length)];
  // Add string in web with computer choice after player push submit button
  const computerChoice = document.body.appendChild(document.createElement('p'));
  computerChoice.textContent = 'Computer selected: ' + computerSelection;

  if (playerSelection === computerSelection) {
    const winner = document.createElement('h1');
    winner.textContent =
      "It's a TIE - " + playerSelection + ' is equal to ' + computerSelection;
    document.body.appendChild(winner);
  }
}

// This function play a five round game that keeps score.
// And reports a winner or loser at the end.
// playGame()
