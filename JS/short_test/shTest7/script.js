const select = document.querySelector('select');
const list = document.querySelector('ul');
const h1 = document.querySelector('h1');

select.addEventListener('change', () => {
  const choice = select.value;
  
  // ADD CONDITIONAL HERE
  if (
    choice === 'January' ||
    choice === 'March' ||
    choice === 'May' ||
    choice === 'July' ||
    choice === 'August' ||
    choice === 'October' ||
    choice === 'December'
  ) {
    createCalendar(31, choice);
  } else if (
    choice === 'April' ||
    choice === 'June' ||
    choice === 'September' ||
    choice === 'November'
  ) {
    createCalendar(30, choice);
  } else if (choice === 'February') {
    createCalendar(28, choice);
  }
});

function createCalendar(days, choice) {
  list.innerHTML = '';
  h1.textContent = choice;
  for (let i = 1; i <= days; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = i;
    list.appendChild(listItem);
  }
}
