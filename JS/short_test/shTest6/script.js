// This one is final code. It's work with "Log in" button until the end.

document.getElementById('run').addEventListener('click', function () {
  let promptStart = prompt("Who's there?");
  let cancel = !promptStart;
  let user = 'Admin';

  if (cancel) {
    alert('Canceled!');
  } else if (promptStart === user) {
    let passPrompt = prompt('Password');
    let pass = 'password';
    let cancelPass = !passPrompt;

    if (cancelPass) {
      alert('Canceled!');
    } else if (passPrompt === pass) {
      alert('Welcome, you are in the future!');
    } else {
      alert('Wrong password!');
    }
  } else {
    alert("I don't know you!");
  }
});

// This one is OK, with button.But until password step.

// document.getElementById("run").addEventListener('click', function() {
//     let promptStart = prompt("Who's there?");
//     let cancel = !promptStart;
//     let user = ("Admin");

// if (cancel) { alert("Canceled!")
// }
// else if (promptStart === user) {
//     prompt("Password");
// }
// else {alert("I don't know you!");
// }
// });

// This one is OK, but without the button and until password step.

// let promptStart = prompt('Who are you?');
// let user = ("Admin");
// let password = ("TheMaster");
// let cancel = !promptStart;

// if (cancel) { alert("Canceled!")
// }
// else if (promptStart === user) {
//     prompt("Password");
// }
// else {alert("I don't know you!");
// };
