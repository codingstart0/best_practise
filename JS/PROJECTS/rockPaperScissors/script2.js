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
let currentStepIndex = 0;

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
}

function addGameToHistory(playerChoice, computerChoice) {
  // gameHistory.push({
  //   playerChoice: playerChoice,
  //   computerChoice: computerChoice,
  // });

  // cia reiktu pasitikrinti ar currentStepIndex nera maziau nei gameHistory.length -1
  // nes tokiu atveju mum reiktu isvalyti visus sekancius array item nuo sito zingsnio
  // ir tik tada irasyti nauja game.
  gameHistory[currentStepIndex] = {
    playerChoice: playerChoice,
    computerChoice: computerChoice,
  };
  currentStepIndex = currentStepIndex + 1;
}

function undo() {
  // tai planas kad currentStepIndex vienu pamazeja
  // ir tada turi paimti is gameHistory choices pagal pamazinta step index
  // tada tuos choices paduot i playRound
  // kaip ir veiks, redo atvirksciai

  if (currentStepIndex > 0) {
    if (gameHistory.length === currentStepIndex) {
      currentStepIndex = currentStepIndex - 2;
    } else {
      currentStepIndex = currentStepIndex - 1;
    }

    // Version -2
    // if (currentStepIndex > 0) {
    //   if (gameHistory.length === currentStepIndex) {
    //     currentStepIndex = currentStepIndex - 2;
    //   } else {
    //     currentStepIndex = currentStepIndex - 1;
    //   }

    const game = gameHistory[currentStepIndex];
    console.log('UndoStepIndex: ', currentStepIndex);
    console.log('History Lenght: ', gameHistory.length);
    console.log('Current Game:', game);

    playRound(game.playerChoice, game.computerChoice);
  }

  // function playUndo (playerChoice, computerChoice){
  // playRound(playerChoice, computerChoice);
  // }
  // let playerChoice = gameHistory[(objArray, "playerChoice");
  // let playerChoice = _.map(gameHistory, _.property(playerChoice))
  // console.log(gameHistory[currentStepIndex].playerChoice);

  // const computerChoice = ;
  // playRound(playerChoice, computerChoice);
  // atasargiai kai stepIndex maziau 0 arba daugiau nei array.length - 1
}

function redo() {
    if (gameHistory.lenght = currentStepIndex) {
    currentStepIndex = currentStepIndex + 1;
    const game = gameHistory[currentStepIndex];
    console.log('redoStepIndex: ', currentStepIndex);
    console.log('History Lenght: ', gameHistory.length);
    console.log('Game History Redo:', gameHistory);

    playRound(game.playerChoice, game.computerChoice);
  }
}

// gameHistory store 3 values:
// playerChoise
// computerChoise
// step

// function fightChoise shoud spit:
// playerChoise
// computerChoise

function onPlayerChoice(playerChoice) {
  const computerChoice = getComputerChoice();

  playRound(playerChoice, computerChoice);
  // cia reikia atsargiai, nes jeigu buvo padaryta
  // undo - galimai mes norim idet zaidima nuo currentStepIndex + 1
  // o ne i esamo array gala, bet tuo paciu reikia ir isvalyti visus
  // sekancius array items nuo currentStepIndex
  addGameToHistory(playerChoice, computerChoice);
  console.log(currentStepIndex, gameHistory);
}
