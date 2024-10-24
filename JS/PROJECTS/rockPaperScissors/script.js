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

let gameHistory = [];
let currentStepIndex = -1;

function getComputerChoice() {
  return choicesArray[Math.floor(Math.random() * choicesArray.length)];
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

function showScore(playerScore, computerScore) {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}

function showTotalScore(playerScore, computerScore) {
  const totalScore = playerScore - computerScore;
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
  showChoices(playerChoice, computerChoice);
  showConclusion(result);
  sideBar(currentStepIndex);

  return result;
}

function addGameToHistory(playerChoice, computerChoice, score) {
  let totalPlayerScore = score.playerScore;
  let totalComputerScore = score.computerScore;

  if (currentStepIndex > -1) {
    const game = gameHistory[currentStepIndex];
    totalPlayerScore = game.playerScore + totalPlayerScore;
    totalComputerScore = game.computerScore + totalComputerScore;
  }

  currentStepIndex = currentStepIndex + 1;

  // How to get this values????? And put them in to side bar???
  gameHistory[currentStepIndex] = {
    playerChoice: playerChoice,
    computerChoice: computerChoice,
    playerScore: totalPlayerScore,
    computerScore: totalComputerScore,
  };

  sideBar(currentStepIndex);
}

function undo() {
  if (currentStepIndex > 0) {
    currentStepIndex = currentStepIndex - 1;
    const game = gameHistory[currentStepIndex];
    const stepScore = gameHistory[currentStepIndex];

    console.log('UndoStepIndex: ', currentStepIndex);
    // console.log('Undo step choice & Score: ', stepScore);

    playRound(game.playerChoice, game.computerChoice);
    showScore(stepScore.playerScore, stepScore.computerScore);
    showTotalScore(stepScore.playerScore, stepScore.computerScore);
    sideBar();
  }
}

function redo() {
  if (currentStepIndex < gameHistory.length - 1) {
    currentStepIndex = currentStepIndex + 1;
    const game = gameHistory[currentStepIndex];
    const stepScore = gameHistory[currentStepIndex];

    console.log('redoStepIndex: ', currentStepIndex);
    // console.log(gameHistory);

    playRound(game.playerChoice, game.computerChoice);
    showScore(stepScore.playerScore, stepScore.computerScore);
    showTotalScore(stepScore.playerScore, stepScore.computerScore);
    sideBar();
  }
}

function getGameScore(result) {
  const score = {
    playerScore: 0,
    computerScore: 0,
  };

  switch (result) {
    case possibleResults.draw:
      score.playerScore++;
      score.computerScore++;
      break;
    case possibleResults.userWins:
      score.playerScore++;
      break;
    case possibleResults.userLoses:
      score.computerScore++;
      break;
  }
  return score;
}

function onPlayerChoice(playerChoice) {
  const computerChoice = getComputerChoice();

  const result = playRound(playerChoice, computerChoice);
  const score = getGameScore(result);

  if (currentStepIndex !== gameHistory.length - 1) {
    gameHistory = gameHistory.slice(0, currentStepIndex + 1);
    console.log('!!!!!sliced gameHistory:', gameHistory);
  }

  addGameToHistory(playerChoice, computerChoice, score);

  const lastGame = gameHistory[currentStepIndex];
  if (lastGame) {
    showScore(lastGame.playerScore, lastGame.computerScore);
    showTotalScore(lastGame.playerScore, lastGame.computerScore);
  }

  sideBar(currentStepIndex);
  console.log(currentStepIndex);
  console.log('onPlayerChoice: ', gameHistory);
}

function sideBar() {
  const curentStepIndexSideBar = document.getElementById(
    'curentStepIndexSideBar'
  );
  const playerChoiceList = document.getElementById('playerChoiceList');
  const computerChoiceList = document.getElementById('computerChoiceList');
  const lastStepIndex = document.getElementById('lastStepIndex');
  const appendChildElement = document.getElementById('appendChild');
  if (curentStepIndexSideBar) {
    curentStepIndexSideBar.textContent = currentStepIndex;
  }
  const currentGame = gameHistory[currentStepIndex];
  if (currentGame) {
    if (playerChoiceList) {
      playerChoiceList.textContent = currentGame.playerChoice;
    }
    if (computerChoiceList) {
      computerChoiceList.textContent = currentGame.computerChoice;
    }
  } else {
    if (playerChoiceList) playerChoiceList.textContent = '-';
    if (computerChoiceList) computerChoiceList.textContent = '-';
  }
  if (lastStepIndex) {
    lastStepIndex.textContent = `${gameHistory.length - 1}`;
  }
  appendChildElement.innerHTML = '';
  gameHistory.forEach((game, index) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<br>Step Index ${index}:<br>Player - ${game.playerChoice}<br> Computer - ${game.computerChoice}`;
    
    if (index === currentStepIndex) {
      newDiv.classList.add('curentStepColor');
    }

    appendChildElement.prepend(newDiv);
  });
}