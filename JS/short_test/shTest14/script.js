let a = prompt('Chose number a');
// a = Number(a);
// This function takes one number and returns that number + 7.
function add7(a) {
  return 'add7 value is ' + (+a + 7);
}
alert(add7(a));

let b = prompt('Chose number b');
// b = Number(b);
// This function takes 2 numbers and returns their product.
function multiply(a, b) {
  return 'multiply value is ' + +a * b;
}
alert(multiply(a, b));

let cap = prompt('write a string');
// This function takes a string and returns that string with the first letter capitalized & the rest of not changed.
function capitalize() {
  return cap[0].toUpperCase() + cap.substring(1);
}
// This function takes a string and returns that string with only the first letter capitalized.
function capitalizeOnly0() {
  return cap[0].toUpperCase() + cap.substring(1).toLowerCase();
}
// This function takes a string and returns that string with all letter capitalized
function capitalizeAll(cap) {
  return cap.toUpperCase();
}
alert(capitalizeOnly0(cap));

// This function takes a string and returns the very last letter of that string.
let str = prompt('write second string');
function lastLetter(last) {
  return last.slice(-1);
}
alert('Last leter is ' + '"' + lastLetter(str) + '"');

// this alert includes first string with capitalized first leter and shows the last letter of this string.
alert('In word ' + '"' + capitalizeOnly0(cap) + '"' + ' the last character is ' + '"' + lastLetter(cap) + '"')