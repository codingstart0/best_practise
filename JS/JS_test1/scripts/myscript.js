var button = document.querySelector("button");
var box = document.getElementById("changeMe");

function changeColor() {
  if (box.style.background == "red") {
    box.style.background = "green";
  } else {
    box.style.background = "red";
  }
}

// let message;
// message = "Hello!";
// message = "We will use cooke's" , "Are you ok with this";
// alert(message);

let message;
message = "Hello!";

let message2;
message2 = "Are you ok with this?";

message = "We will use cooke's. ";
alert(message+message2);

// let hello = "Hello world";
// let message;
// message = hello;
// alert(message);
// alert(hello);
