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
// let scoreDifference = 0;

// const choices = ['rock', 'paper', 'scissors'];
// 1 TASK this list of const should go inside the functions
// const playerDisplay = document.getElementById('playerDisplay');
// const computerDisplay = document.getElementById('computerDisplay');

// UŽKOMENTINAU 3 apatinius const, bet niekas nepagriuvo
// const playerScoreDisplay = document.getElementById('playerScoreDisplay');
// const computerScoreDisplay = document.getElementById('computerScoreDisplay');
// const scoreSumDisplay = document.getElementById('scoreSumDisplay');

// 2 TASK seperate functions to indipendent ones from function playGame 

function getComputerChoice() {
  return choicesArray[Math.floor(Math.random() * choicesArray.length)];
}

function showChoices(playerChoice, computerChoice) {
  const playerChoiceElement = document.getElementById('playerChoice');
  const computerChoiceElement = document.getElementById('computerChoice');
  playerChoiceElement.textContent = playerChoice;
  computerChoiceElement.textContent = computerChoice;
}

function showConclusion(possibleResults) {
  const resultDisplay = document.getElementById('resultDisplay');
  
  resultDisplay.classList.remove('greenText', 'redText', 'blueText');
  switch (result) {
    case possibleResults.draw:
      resultDisplay.textContent = "IT'S A TIE!";
      resultDisplay.classList.add('blueText');
      break;
    case possibleResults.userWins:
      resultDisplay.textContent = "YOU WIN!";
      resultDisplay.classList.add('greenText');
      break;
    case possibleResults.userLoses:
      resultDisplay.textContent = "YOU LOSE!";
      resultDisplay.classList.add('redText');
      break;
  }
}

function showResult (playerScore, computerScore) {
  const scoreSumDisplay = document.getElementById('scoreSumDisplay');
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
}

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  // let result = '';
  let userWins = false;

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
  showResult (playerScore, computerScore)
  showConclusion (possibleResults)
 
  switch (result) {
    case possibleResults.draw:
      break;
    case possibleResults.userWins:
      playerScore++;
      playerScoreDisplay.textContent = playerScore;
      break;
    case possibleResults.userLoses:
      computerScore++;
      computerScoreDisplay.textContent = computerScore;
      break;
  }
}
