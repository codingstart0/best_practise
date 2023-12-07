const dadBox = document.body.querySelector('.dad');
const dadButton = document.querySelector('#add-child-dad');

const momBox = document.body.querySelector('.mom');
const momButton = document.querySelector('#add-child-mom');

function appendChildBox(box, childClassName, childText, max = 2) {
  if (box.childNodes.length <= max) {
    const child = document.createElement('div');
    child.classList.add(childClassName);
    child.textContent = childText;
    box.append(child);
  }
}

dadButton.addEventListener('click', () => {
  appendChildBox(dadBox, 'child', 'tetes', 4);
});

momButton.addEventListener('click', () => {
  appendChildBox(momBox, 'child', 'mamos', 3);
});

const removeChild = document.body.querySelector('#remove-child');
removeChild.addEventListener('click', () => {
  const dadChildren = document.querySelector('.dad').querySelectorAll('.child');
  const momChildren = document.querySelector('.mom').querySelectorAll('.child');

  if (dadChildren.length > 0) {
    dadChildren[dadChildren.length - 1].remove();
  }
  if (momChildren.length > 0) {
    momChildren[momChildren.length - 1].remove();
  }
});
