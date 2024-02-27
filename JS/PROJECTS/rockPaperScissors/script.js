// declare choise as an array: ["rock", "paper", "scissors"]
const choices = ['rock', 'paper', 'scissors'];


// Play game  The function should take two parameters - the playerSelection and computerSelection
// And return a string that declares the winner. E. g. like so: "You Lose! Paper beats Rock"
function playRound(playerSelection, computerSelection) {
}


// Player should choise from list ‘Rock’, ‘Paper’ or ‘Scissors’.
  // Create a select element
  const selectElement = document.createElement('select');
  // Add options to the dropdown list
  choices.forEach(choice => {
    const option = document.createElement('option');
    option.value = choice;
    option.text = choice.charAt(0).toUpperCase() + choice.slice(1); // Capitalize the first letter
    selectElement.appendChild(option);
  });
  // Add the select element to the document body
  document.body.appendChild(selectElement);
  // Add a button to get the player's selection
  const button = document.createElement('button');
  button.textContent = 'Submit';
  button.addEventListener('click', getPlayerSelection);
  document.body.appendChild(button);
  function getPlayerSelection() {
    const selectedOption = selectElement.value;
    if (choices.includes(selectedOption)) {
      const playerSelection = selectedOption;
      console.log('Player selected:', playerSelection);
    } else {
      console.log('Invalid selection. Please choose rock, paper, or scissors.');
    }
  }
// const playerSelection = selectElement.value[document.querySelector(options)];


// Or via prompt player can add playerSelection by string 
// So make shure it's case-insensitive, users can input rock, ROCK, RocK or any other variation.
// function playerSelection () {
//     selectElement = document.querySelector(options);
//     output = selectElement.value;
//    }

// Computer should randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’. 
const computerSelection = choices[Math.floor(Math.random() * choices.length)];
console.log ('Computer selected:', computerSelection)

// neveikia
// alert (playerSelection)

