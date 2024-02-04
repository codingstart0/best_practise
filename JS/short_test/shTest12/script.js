// function declration 
// let age = 20;
// function checkAge(age) {
//     if (age > 18) {
//       return true;
//     } else {
//       return confirm('Did parents allow you?');
//     }
//   }
// alert(checkAge(age));

//Using a question mark operator ?
// let age = 10;
// function checkAge(age) {
// return (age > 18) ? true : confirm('Did parents allow you?');
// }
// alert(checkAge(age));

// Using OR||
// let age = 8;
// function checkAge(age) {
//     return (age > 18) || confirm('Did parents allow you?');}
// alert(checkAge(age));

// function min(a, b){
//     if (a < b) { return a;
// }
// return b;
// }
// alert(min(1, 1));

// A solution with a question mark operator '?'
// function min(a, b) {
//   return a < b ? a : b;
// }
// alert(min(5, 10));

// let name = "Declaration";
// function sayHi(name) {
//   return ( "Hello " + name);
//   }
// alert (sayHi(name));

// let name1 = function (name1) {
//   return ("Hello Expression")
// }
// alert (name1());

// let name2 = (name2) => "Hello arrow";
// alert (name2());

// let congrat = 'Have a nice day';
// let justDoIt = 'Keep calm ';
// function ask(question, yes, no) {
//   if (confirm(question)) yes();
//   else no();
// }
// ask(
//   'Are you happy?',
//   function () {
//     alert(congrat);
//   },
//   function () {
//     alert("Try don't worry. " + justDoIt);
//   }
// );


//   function showOk() {
//     alert("You agreed.")
//   }
//   function showCancel() {
//     alert("You canceled the execution.");
//   }
//   ask ("Do you agree?", showOk, showCancel);

// Expresion 
let sum = function(a, b) {
  return a + b;
  };
  alert (sum(5, 3));

  // Arrow
let sum1 = (a, b) => a + b;
alert (sum1(6, 3));
