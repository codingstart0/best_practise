const dadBox = document.body.querySelector(".dad");
const dadButton = document.querySelector("#add-child-dad");

dadButton.addEventListener("click", () => {
  // Only add a child if we don't already have one
  // in addition to the text node "parent"
  if (dadBox.childNodes.length > 4) {
    return;
  }
  const child = document.createElement("div");
  child.classList.add("child");
  child.textContent = "child";
  dadBox.appendChild(child);
});

const removeChild = document.body.querySelector("#remove-child");
removeChild.addEventListener("click", () => {
  const child = document.body.querySelector(".child");
  dadBox.removeChild(child);
});



const momBox = document.body.querySelector(".mom");
const momButton = document.querySelector("#add-child-mom");







////////////////////////////////////////

// const addChild = document.body.querySelector("#add-child-dad");
// addChild.addEventListener("click", () => {
//   // Only add a child if we don't already have one
//   // in addition to the text node "parent"
// //   if (dad.childNodes.length > 1) {
// //     return;
// //   }
// // if (Event.click) = dad {
//   const child = document.createElement("div");
//   child.classList.add("child");
//   child.textContent = "child for dad";
//   dadBox.appendChild(child);

// //   const child = document.createElement("div");
// //   child.classList.add("child");
// //   child.textContent = "child for mom";
// //   mom.appendChild(child);
// });


// Child = document.body.querySelector("#add-child-mom");
// addChild.addEventListener("click", () => {
//   // Only add a child if we don't already have one
//   // in addition to the text node "parent"
//   if (mom.childNodes.length > 1) {
//     return;
//   }

// });









