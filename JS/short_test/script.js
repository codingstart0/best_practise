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
// function min(a, b){
//     return (a < b)  ? a : b;
// }
// alert(min(1, 1));



// The JavaScript engine will issue a stack overflow error
// function fn() {
//     fn();
// }
// fn();



// This example uses a big loop to simulate a blocking function
function task(message) {
    // emulate time consuming task
    let n = 10000000000;
    while (n > 0){
        n--;
    }
    console.log(message);
}

console.log('Start script...');
task('Call an API');
console.log('Done!');



// To prevent a blocking function from blocking other activities, you typically put it in a callback function for execution later.
// console.log('Start script...');

// setTimeout(() => {
//     task('Download a file.');
// }, 1000);

// console.log('Done!');