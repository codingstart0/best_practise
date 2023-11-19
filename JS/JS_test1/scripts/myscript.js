var button = document.querySelector("button");
var box = document.getElementById("changeMe");

// function changeColor() {
//   // box.style.background = "blue";

//   if (box.style.background == "red") {
//      box.style.background = "green";
//   } else {
//     box.style.background = "hotpink";
//   }
// }


// function changeColor(){
//   box.style.background = "blue";
// }

function changeColor(){
  if(box.style.background == "red"){
    box.style.background = "green";
  }else{
    box.style.background = "red";
  }
}