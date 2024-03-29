//Add *10 to Math.random, that it will return number from 0 to 9.
//So now randomNumber is from 1 to 10
let randomNumber = Math.floor(Math.random() * 10) + 1;

  const guesses = document.querySelector('.guesses');
  const lastResult = document.querySelector('.lastResult');
  const lowOrHi = document.querySelector('.lowOrHi');
  const guessSubmit = document.querySelector('.guessSubmit');
  const guessField = document.querySelector('.guessField');

  let guessCount = 1;
  let resetButton;

  function checkGuess() {

    const userGuess = Number(guessField.value);
    if(guessCount === 1) {
      guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';

    if(userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      setGameOver();
    } else if(guessCount === 3) {
      lastResult.textContent = '!!!GAME OVER!!!';
      // Change text and shows the answer number.
        lowOrHi.textContent = 'Right number was ' + randomNumber;
        setGameOver();
    } else {
      lastResult.textContent = 'Wrong!';
      lastResult.style.backgroundColor = 'red';
      if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
      }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
  }
  //change addeventListener to addEventListener
  guessSubmit.addEventListener('click', checkGuess);

  function setGameOver() {
	  guessField.disabled = true;
	  guessSubmit.disabled = true;
	  resetButton = document.createElement('button');
	  resetButton.textContent = 'Start new game';
	  document.body.appendChild(resetButton);
	  
    //change addeventListener to addEventListener
	  resetButton.addEventListener('click', resetGame);
  }

  function resetGame() {
	  guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
      resetPara.textContent = '';
    }
	  resetButton.parentNode.removeChild(resetButton);

	  guessField.disabled = false;
	  guessSubmit.disabled = false;
	  guessField.value = '';
	  guessField.focus();

	  lastResult.style.backgroundColor = 'white';
	  
	//Add *10 to Math.random, that it will return number from 0 to 9.
	//So now randomNumber is from 1 to 10
	  randomNumber = Math.floor(Math.random() *10) + 1;
  }
