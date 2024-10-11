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

// Create array that contains buttons click action steps
const gameHistory = [];
let currentStepIndex = -1;

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  return choicesArray[Math.floor(Math.random() * choicesArray.length)];
}

function playerPush(playerChoice) {
  console.log(playerChoice, getComputerChoice);
}

function showChoices(playerChoice, computerChoice) {
  const playerChoiceElement = document.getElementById('playerChoice');
  const computerChoiceElement = document.getElementById('computerChoice');
  playerChoiceElement.textContent = playerChoice;
  computerChoiceElement.textContent = computerChoice;
}

function showConclusion(result) {
  const resultDisplay = document.getElementById('resultDisplay');

  resultDisplay.classList.remove('greenText', 'redText', 'blueText');
  switch (result) {
    case possibleResults.draw:
      resultDisplay.textContent = "IT'S A TIE!";
      resultDisplay.classList.add('blueText');
      break;
    case possibleResults.userWins:
      resultDisplay.textContent = 'YOU WIN!';
      resultDisplay.classList.add('greenText');
      break;
    case possibleResults.userLoses:
      resultDisplay.textContent = 'YOU LOSE!';
      resultDisplay.classList.add('redText');
      break;
  }
}

function calculateScore(result) {
  switch (result) {
    case possibleResults.draw:
      playerScore++;
      computerScore++;
      break;
    case possibleResults.userWins:
      playerScore++;
      break;
    case possibleResults.userLoses:
      computerScore++;
      break;
  }
  return playerScore - computerScore;
}

function showScore(playerScore, computerScore) {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}

function showTotalScore(totalScore) {
  const scoreSumDisplay = document.getElementById('scoreSumDisplay');
  scoreSumDisplay.textContent = `${totalScore}`;

  scoreSumDisplay.classList.remove('zeroColor', 'plusColor', 'minusColor');
  if (totalScore < 0) {
    scoreSumDisplay.classList.add('minusColor');
  } else if (totalScore > 0) {
    scoreSumDisplay.classList.add('plusColor');
  } else {
    scoreSumDisplay.classList.add('zeroColor');
  }
}

function playRound(playerChoice, computerChoice) {
  let result = '';
  let userWins = false;

  if (playerChoice === computerChoice) {
    result = possibleResults.draw;
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
    result = userWins ? possibleResults.userWins : possibleResults.userLoses;
  }

  const totalScore = calculateScore(result);

  showChoices(playerChoice, computerChoice);
  showConclusion(result);
  showScore(playerScore, computerScore);
  showTotalScore(totalScore);

  return result;
}

function addGameToHistory(playerChoice, computerChoice, playerScore, computerScore) {

  let totalPlayerScore = playerScore;
  let totalComputerScore = computerScore;

  if (currentStepIndex > -1) {
    const game = gameHistory[currentStepIndex];
    totalPlayerScore = game.playerScore + totalPlayerScore;
    totalComputerScore = game.computerScore + totalComputerScore;
  }
  // cia reiktu pasitikrinti ar currentStepIndex nera maziau nei gameHistory.length -1
  // nes tokiu atveju mum reiktu isvalyti visus sekancius array item nuo sito zingsnio
  // ir tik tada irasyti nauja game.

  currentStepIndex = currentStepIndex + 1;
  gameHistory[currentStepIndex] = {
    playerChoice: playerChoice,
    computerChoice: computerChoice,
    playerScore: totalPlayerScore,
    computerScore: totalComputerScore,
  };
}

function undo() {
  if (currentStepIndex > 0) {
    currentStepIndex = currentStepIndex - 1;
    const game = gameHistory[currentStepIndex];
    const stepScore = gameHistory[currentStepIndex];
    console.log('History Lenght: ', gameHistory.length);
    console.log('UndoStepIndex: ', currentStepIndex);
    console.log('Current Game:', game);

    playRound(game.playerChoice, game.computerChoice);
    showScore(stepScore.playerScore, stepScore.computerScore)
  }
}

function redo() {
  if (currentStepIndex < gameHistory.length - 1) {
    currentStepIndex = currentStepIndex + 1;
    const game = gameHistory[currentStepIndex];
    const stepScore = gameHistory[currentStepIndex];
    console.log('History Lenght: ', gameHistory.length);
    console.log('redoStepIndex: ', currentStepIndex);
    console.log('Game:', game);

    playRound(game.playerChoice, game.computerChoice);
    showScore(stepScore.playerScore, stepScore.computerScore)
  }
}

function onPlayerChoice(playerChoice) {
  const computerChoice = getComputerChoice();

  const result = playRound(playerChoice, computerChoice);
  console.log (result);
  // cia reikia atsargiai, nes jeigu buvo padaryta
  // undo - galimai mes norim idet zaidima nuo currentStepIndex + 1
  // o ne i esamo array gala, bet tuo paciu reikia ir isvalyti visus
  // sekancius array items nuo currentStepIndex
  addGameToHistory(playerChoice, computerChoice);
  console.log('currentStepIndex: ', currentStepIndex, gameHistory);
}

// kad ištrinti buvusius žaidimus kai pradedam vėl žaisti po
// undo & redo panaudojimo, taikyti slice arba splice metoda
// array.slice(currentStepIndex, )
