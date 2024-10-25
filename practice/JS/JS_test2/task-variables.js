const btns = document.querySelectorAll(".start-button");
// const txt = document.querySelector("h1");
// const bckg = document.querySelector("body");

const startedButtonClass = "started"

// btn.addEventListener("click", updateBtn);
// btns.forEach((btn)=> {
//   btn.addEventListener("click", updateBtn);
// })

function startMachine(btn,txt){
  btn.textContent = "Stop machine"; 
  txt.textContent = "The machine has started!";
  btn.classList.add(startedButtonClass);
  txt.classList.add(startedButtonClass);
}

function stopMachine (btn,txt){
  btn.textContent = "Start machine"; 
  txt.textContent = "The machine is stopped.";
  // btn.className = "start-button"
  btn.classList.remove(startedButtonClass);
  txt.classList.remove(startedButtonClass);
}

function updateBtn(event) {
  console.log(event.target);
  const clickedBtn = event.target;
  const txt = clickedBtn.nextElementSibling;
  console.log (clickedBtn.nextElementSibling)
  if (clickedBtn.textContent === "Start machine") {
   startMachine(clickedBtn, txt);

    // btn.className = "start-button started"
  } else {
    stopMachine(clickedBtn,txt);
    // bckg mintis kad cia reikia irasyti komanda
  }
}

// console.log(btn);
