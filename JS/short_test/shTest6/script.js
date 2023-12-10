// On this one still working


document.getElementById('run').addEventListener('click', function () {
    let promptStart = prompt("Who's there?");
    let cancel = !promptStart;
    let user = 'Admin';
    
    let greeting = 'Welcome';
  
  //   let wrongPass = alert('Wrong password');
  
    if (cancel) {
      alert('Canceled!');
    } else if (promptStart === user) {
       function(prompt) {
          let passPrompt = prompt('Password');
          let pass =("password");
          if (passPrompt = pass) {alert(greeting)}
      };
    } else {
      alert("I don't know you!");
    }
  });


// This one is OK, with button.But until password step.
document.getElementById("run").addEventListener('click', function() {
    let promptStart = prompt("Who's there?");
    let cancel = !promptStart;
    let user = ("Admin");
    
if (cancel) { alert("Canceled!")
}
else if (promptStart === user) {
    prompt("Password"); 
}
else {alert("I don't know you!");
}
});


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