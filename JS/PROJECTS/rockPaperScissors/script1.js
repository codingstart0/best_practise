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
    const computerChoice = document.body.appendChild(
      document.createElement('p')
    );
    computerChoice.textContent = 'Computer selected: ' + computerSelection;

    // Determine the winner of the round
    if (playerSelection === computerSelection) {
      const winner = document.createElement('h2');
      const tie = document.createElement('span');
      tie.textContent = 'TIE ';
      tie.classList.add('tie-color'); // Add the 'tie-color' class to style the text
      winner.innerHTML =
        "It's a " +
        tie.outerHTML +
        playerSelection +
        ' is equal to ' +
        computerSelection;
      document.body.appendChild(winner);
    } else if (
      (playerSelection === 'Rock') &
      (computerSelection === 'Scissors')
    ) {
      const winner = document.createElement('h2');
      const win = document.createElement('span');
      win.textContent = 'WIN ';
      win.classList.add('win-color'); // Add the 'win-color' class to style the text
      winner.innerHTML =
        'You ' +
        win.outerHTML +
        playerSelection +
        ' beats ' +
        computerSelection;
      document.body.appendChild(winner);
      playerScore++;
    } else if ((playerSelection === 'Rock') & (computerSelection === 'Paper')) {
      const winner = document.createElement('h2');
      const lose = document.createElement('span');
      lose.textContent = 'LOSE ';
      lose.classList.add('lose-color'); // Add the 'win-color' class to style the text
      winner.innerHTML =
        'You ' +
        lose.outerHTML +
        computerSelection +
        ' beats ' +
        playerSelection;
      document.body.appendChild(winner);
      computerScore++;
    } else if ((playerSelection === 'Paper') & (computerSelection === 'Rock')) {
      const winner = document.createElement('h2');
      const win = document.createElement('span');
      win.textContent = 'WIN ';
      win.classList.add('win-color'); // Add the 'win-color' class to style the text
      winner.innerHTML =
        'You ' +
        win.outerHTML +
        playerSelection +
        ' beats ' +
        computerSelection;
      document.body.appendChild(winner);
      playerScore++;
    } else if (
      (playerSelection === 'Paper') &
      (computerSelection === 'Scissors')
    ) {
      const winner = document.createElement('h2');
      const lose = document.createElement('span');
      lose.textContent = 'LOSE ';
      lose.classList.add('lose-color'); // Add the 'win-color' class to style the text
      winner.innerHTML =
        'You ' +
        lose.outerHTML +
        computerSelection +
        ' beats ' +
        playerSelection;
      document.body.appendChild(winner);
      computerScore++;
    } else if (
      (playerSelection === 'Scissors') &
      (computerSelection === 'Paper')
    ) {
      const winner = document.createElement('h2');
      const win = document.createElement('span');
      win.textContent = 'WIN ';
      win.classList.add('win-color'); // Add the 'win-color' class to style the text
      winner.innerHTML =
        'You ' +
        win.outerHTML +
        playerSelection +
        ' beats ' +
        computerSelection;
      document.body.appendChild(winner);
      playerScore++;
    } else if (
      (playerSelection === 'Scissors') &
      (computerSelection === 'Rock')
    ) {
      const winner = document.createElement('h2');
      const lose = document.createElement('span');
      lose.textContent = 'LOSE ';
      lose.classList.add('lose-color'); // Add the 'win-color' class to style the text
      winner.innerHTML =
        'You ' +
        lose.outerHTML +
        computerSelection +
        ' beats ' +
        playerSelection;
      document.body.appendChild(winner);
      computerScore++;
    }
    const result = document.createElement('h1');
    result.classList.add('result-color');
    // playerScore.textContent = 'Player Score:';
    // computerScore.textContent = 'Computer Score:';
    result.innerHTML =
      'RESULT ' +
      'Player Score: ' +
      playerScore +
      ' ' +
      'Computer Score: ' +
      computerScore;
    document.body.appendChild(result);

    // Display the choices and scores after each round
    console.log('Player Selection:', playerSelection);
    console.log('Computer Selection:', computerSelection);
    console.log('Player Score:', playerScore);
    console.log('Computer Score:', computerScore);

    currentRound++;
    if (currentRound < 3) {
      // Call the function to present choices for the next round
      playRoundPrompt();
    } else {
      const gameOver = document.createElement('h3');
      gameOver.classList.add('result-color');
      gameOver.innerHTML = 'GAME OVER!';
      document.body.appendChild(gameOver);
      console.log(gameOver);
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
