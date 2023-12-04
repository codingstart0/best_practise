const dadBox = document.body.querySelector('.dad');
const dadButton = document.querySelector('#add-child-dad');

dadButton.addEventListener('click', () => {
  // Only add a child if we don't already have one
  // in addition to the text node "parent"
  if (dadBox.childNodes.length > 3) {
    return;
  }
  const child = document.createElement('div');
  child.classList.add('child');
  child.textContent = 'child';
  dadBox.appendChild(child);
});

const momBox = document.body.querySelector('.mom');
const momButton = document.querySelector('#add-child-mom');

momButton.addEventListener('click', () => {
  // Only add a child if we don't already have one
  // in addition to the text node "parent"
  if (momBox.childNodes.length > 4) {
    return;
  }
  const child = document.createElement('div');
  child.classList.add('child');
  child.textContent = 'child';
  momBox.appendChild(child);
});

const removeChild = document.body.querySelector('#remove-child');
removeChild.addEventListener('click', () => {
  const children = document.body.querySelectorAll('.child');
  children.forEach((child) => {
    child.parentNode.removeChild(child);
  });
});
