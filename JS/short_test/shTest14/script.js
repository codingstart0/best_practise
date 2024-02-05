let a = prompt('Chose number a');
a = Number(a);

let b = prompt('Chose number b');
b = Number(b);

function add7(a) {
  return 'add7 value is ' + (a + 7);
}
alert(add7(a));

function multiply(a, b) {
  return 'multiply value is ' + a * b;
}
alert(multiply(a, b));
