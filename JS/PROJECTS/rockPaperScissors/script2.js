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
  gameHistory[currentStepIndex] = {
    playerChoice: playerChoice,
    computerChoice: computerChoice,
    playerScore: totalPlayerScore,
    computerScore: totalComputerScore,
  };

  console.log('currentStepIndex from addGameToHistory: ', currentStepIndex);
  console.log('addGameToHistory History Lenght: ', gameHistory.length);
}

function undo() {
  if (currentStepIndex > 0) {
    currentStepIndex = currentStepIndex - 1;
    const game = gameHistory[currentStepIndex];
    const stepScore = gameHistory[currentStepIndex];

    console.log('undo History Lenght: ', gameHistory.length);
    console.log('UndoStepIndex: ', currentStepIndex);
    console.log('Undo step choice & Score: ', stepScore);

    playRound(game.playerChoice, game.computerChoice);
    showScore(stepScore.playerScore, stepScore.computerScore);
    showTotalScore(stepScore.playerScore, stepScore.computerScore);
  }
}

function redo() {
  if (currentStepIndex < gameHistory.length - 1) {
    currentStepIndex = currentStepIndex + 1;
    const game = gameHistory[currentStepIndex];
    const stepScore = gameHistory[currentStepIndex];

    console.log('redo History Lenght: ', gameHistory.length);
    console.log('redoStepIndex: ', currentStepIndex);
    console.log(gameHistory);

    playRound(game.playerChoice, game.computerChoice);
    showScore(stepScore.playerScore, stepScore.computerScore);
    showTotalScore(stepScore.playerScore, stepScore.computerScore);
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
  showScore(lastGame.playerScore, lastGame.computerScore);
  showTotalScore(lastGame.playerScore, lastGame.computerScore);
  console.log(gameHistory);
}

//   // TASK 1
//   // cia reikia atsargiai, nes jeigu buvo padaryta
//   // undo - galimai mes norim idet zaidima nuo currentStepIndex + 1
//   // o ne i esamo array gala, bet tuo paciu reikia ir isvalyti visus
//   // sekancius array items nuo currentStepIndex

//   // kad ištrinti buvusius žaidimus kai pradedam vėl žaisti po
//   // undo & redo panaudojimo, taikyti slice arba splice metoda
//   // array.slice(currentStepIndex, )
//   addGameToHistory(playerChoice, computerChoice, score);

//   const lastGame = gameHistory[currentStepIndex];
//   showScore(lastGame.playerScore, lastGame.computerScore);
//   showTotalScore(lastGame.playerScore, lastGame.computerScore);
//   console.log(
//          gameHistory
//   // 'currentStepIndex: ',
//     );

// const deleteIndexCount = gameHistory.length - currentStepIndex;
//     if (currentStepIndex < gameHistory.length - 1) {
//       gameHistory.splice(currentStepIndex, deleteIndexCount)
//       console.log(deleteIndexCount)
//     }

// }

// TASK final
// 1.  Create side bar for steps index
//     Add html element
// 2.  Bolded curent step
//     Make so that every time this side bar will be redraw again
