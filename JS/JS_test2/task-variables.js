const btn = document.querySelector("button");
const txt = document.querySelector("h1");
// const bckg = document.querySelector("body");

btn.addEventListener("click", updateBtn);

function updateBtn() {
  if (btn.textContent === "Start machine") {
    btn.textContent = "Stop machine";
    txt.textContent = "The machine has started!";
  } else {
    btn.textContent = "Start machine";
    txt.textContent = "The machine is stopped.";
    // bckg mintis kad cia reikia irasyti komanda
  }
}

console.log(btn);
