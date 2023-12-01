const buttons = document.getElementsByClassName('type');


function greeting() {
  const name = prompt('What is your name?');
  const greetingInJs = document.querySelector('#greet');
  greetingInJs.textContent = `Hello ${name}, nice to see you!`;
}


for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function greeting() {
    const name = prompt('What is your name?');
    const greetingInJs = document.querySelector('#greet');
    greetingInJs.textContent = `Hello ${name}, nice to see you!`;
  }  
  );
}


// firstButton.addEventListener('click', greeting);

// const button = document.('button');

// function greet() {
//   const name = prompt('What is your name?');
//   const greetingInJs = document.querySelector('#greeting');
//   greetingInJs.textContent = `Hello ${name}, nice to see you!`;
//   }

// buttonInJs.addEventListener('click', greet);

// const aNumber = Number(window.prompt('Type a number', ''));

// function win() {
//   if (aNumber === 6) {
//     alert('Wow you win!!!!');
//   } else alert('try next time!');
// }
// aNumber = window.prompt('Your the best');
