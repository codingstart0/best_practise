// Function declaration
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}
ask(
  'Do you agree?',
  function () {
    alert('You agreed.');
  },
  function () {
    alert('You canceled the execution.');
  }
);

// Arrow Function
let ask1 = (question, yes, no) => {
  if (confirm(question)) yes();
  else no();
};
ask1(
  'Do you agree second time?',
  function () {
    alert('You agreed.');
  },
  function () {
    alert('You canceled the execution.');
  }
);

// Arrow Function with question mark operator
let ask2 = (question, yes, no) => {
  confirm(question) ? yes() : no();
};
ask2(
  'Do you agree third time?',
  function () {
    alert('You agreed.');
  },
  function () {
    alert('You canceled the execution.');
  }
);

// Arrow Function 
let ask3 = (question, yes, no) => {
  confirm(question) ? yes() : no();
};
ask3(
  'Do you agree fourth time?',
  () => alert('You agreed.'),
  () => alert('It was your last chance.')
);