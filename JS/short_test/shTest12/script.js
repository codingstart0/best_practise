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
function min(a, b){
    return (a < b)  ? a : b;
}
alert(min(1, 1));


function sayHi() {
    alert( "Hello" );
  }
  sayHi()