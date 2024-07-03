// declare choice as an array: ["Rock", "Paper", "Scissors"]
const choices = ['Rock', 'Paper', 'Scissors'];
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;

function playGame() {
  function playRound(playerSelection) {
    // Generate a random computer selection
    const computerSelection =
      choices[Math.floor(Math.random() * choices.length)];

    // Determine the winner of the round
    if (playerSelection === computerSelection) {
      console.log("It's a tie!");
    } else if (
      (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
      (playerSelection === 'Paper' && computerSelection === 'Rock') ||
      (playerSelection === 'Scissors' && computerSelection === 'Paper')
    ) {
      playerScore++;
      console.log('You win this round!');
    } else {
      computerScore++;
      console.log('Computer wins this round!');
    }

    // Display the choices and scores after each round
    console.log('Player Selection:', playerSelection);
    console.log('Computer Selection:', computerSelection);
    console.log('Player Score:', playerScore);
    console.log('Computer Score:', computerScore);

    currentRound++;
    if (currentRound < 5) {
      // Call the function to present choices for the next round
      playRoundPrompt();
    } else {
      console.log('Game Over!');
    }
  }

  function playRoundPrompt() {
    // Clear previous buttons
    document.body.innerHTML = '';

    // Create buttons for player choices
    choices.forEach((choice) => {
      const button = document.createElement('button');
      button.textContent = choice;
      // Remove the previous event listener to avoid duplicates
      button.removeEventListener('click', playRound);
      button.addEventListener('click', () => playRound(choice));
      document.body.appendChild(button);
    });
  }

  // Start the game with the first round
  playRoundPrompt();
}

// Add a button to start the game
const button = document.createElement('button');
button.textContent = 'Play Game';
button.addEventListener('click', playGame);
document.body.appendChild(button);
