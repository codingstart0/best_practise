const story = document.body.querySelector(".story");

const storyPush = document.getElementsByClassName(".storyPush");

const setText = document.body.querySelector("#set-text");
setText.addEventListener("click",

() => {
  story.textContent = "It was a dark and stormy night...", "storyPush";
}

);

const clearText = document.body.querySelector("#clear-text");
clearText.addEventListener("click", () => {
  story.textContent = "";
});
