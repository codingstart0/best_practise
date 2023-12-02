const story = document.body.querySelector('.story');

const storyPush = "storyPush";

const setText = document.body.querySelector('#set-text');

setText.addEventListener(
  'click',
  () => {
    story.textContent = 'It was a dark and stormy night...';
    story.classList.add(storyPush);
    // story.style = storyPush;
  }
  // () => {"storyPush"},
);

const clearText = document.body.querySelector('#clear-text');
clearText.addEventListener('click', () => {
  story.textContent = '';
  story.classList.remove(storyPush);
});