const possibleResults = {
  draw: 0,
  userWins: 1,
  userLoses: 2,
};
const choices = {
  rock: 'ROCK',
  paper: 'PAPER',
  scissors: 'SCISSORS',
};
const choicesArray = Object.values(choices);

let playerScore = 0;
let computerScore = 0;

// const choices = ['rock', 'paper', 'scissors'];
// 1 TASK this list of const should go inside the functions
// const playerDisplay = document.getElementById('playerDisplay');
// const computerDisplay = document.getElementById('computerDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const playerScoreDisplay = document.getElementById('playerScoreDisplay');
const computerScoreDisplay = document.getElementById('computerScoreDisplay');
const scoreSumDisplay = document.getElementById('scoreSumDisplay');

// 2 TASK seperate functions to indipendent ones from function playGame 

function showChoices(playerChoice, computerChoice) {
  const playerChoiceElement = document.getElementById('playerChoice');
  const computerChoiceElement = document.getElementById('computerChoice');
  playerChoiceElement.textContent = playerChoice;
  computerChoiceElement.textContent = computerChoice;
}

function getComputerChoice() {
  return choicesArray[Math.floor(Math.random() * choicesArray.length)];
}

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  let result = '';
  let userWins = false;
  let draw = false;

  if (playerChoice === computerChoice) {
    result = possibleResults.draw
  } else {
    switch (playerChoice) {
      case choices.rock:
        userWins = computerChoice === choices.scissors;
        break;
      case choices.paper:
        userWins = computerChoice === choices.rock;
        break;
      case choices.scissors:
        userWins = computerChoice === choices.paper;
        break;
    }
    result = userWins ? possibleResults.userWins : possibleResults.userLoses
  }

  showChoices(playerChoice, computerChoice);


  switch (result) {
    case possibleResults.draw:
      resultDisplay.textContent = "IT'S A TIE!";
      break;
    case possibleResults.userWins:
      resultDisplay.textContent = "YOU WIN!";
      break;
    case possibleResults.userLoses:
      resultDisplay.textContent = "YOU LOSE!";
      break;
  }

  resultDisplay.classList.remove('greenText', 'redText', 'blueText');

  switch (result) {
    case possibleResults.draw:
      resultDisplay.classList.add('blueText');
      break;
    case possibleResults.userWins:
      resultDisplay.classList.add('greenText');
      playerScore++;
      playerScoreDisplay.textContent = playerScore;
      break;
    case possibleResults.userLoses:
      resultDisplay.classList.add('redText');
      computerScore++;
      computerScoreDisplay.textContent = computerScore;
      break;
  }

  let scoreDifference = playerScore - computerScore;
  scoreSumDisplay.textContent = `${scoreDifference}`;

  scoreSumDisplay.classList.remove('zeroColor', 'plusColor', 'minusColor');
  if (scoreDifference < 0) {
    scoreSumDisplay.classList.add('minusColor');
  } else if (scoreDifference > 0) {
    scoreSumDisplay.classList.add('plusColor');
  } else {
    scoreSumDisplay.classList.add('zeroColor');
  }
  // this is alow to change score color depends on ho wins the game in the moment
}
