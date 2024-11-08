const localStorageKeyTodos = 'todos';
let todos = [];
let lastIndex = 0;

document.getElementById('new-todo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});

document
  .getElementById('clear-todos')
  .addEventListener('click', clearCompletedTodos);

function loadTodos() {
  try {
    todos = JSON.parse(localStorage.getItem(localStorageKeyTodos)) || [];
    todos.forEach((todo) => {
      addTodoToDOM(todo.text);
    });
  } catch (err) {
    alert(err.message);
    localStorage.setItem(localStorageKeyTodos, JSON.stringify([]));
  }
}

function getExistingTodos() {
  return Array.from(
    document.querySelectorAll('#todo-list .form-check-label')
  ).map((label) => label.textContent.trim());
}

function addTodo() {
  const input = document.getElementById('todo-input');
  let todoText = input.value.trim();
  const existingTodos = getExistingTodos(); // Get existing todos from the DOM

  if (todoText) {
    todoText =
      todoText.charAt(0).toUpperCase() + todoText.slice(1).toLowerCase();

    if (
      existingTodos
        .map((todo) => todo.toUpperCase())
        .includes(todoText.toUpperCase())
    ) {
      // if (existingTodos.includes(todoText))
      alert('This todo already exists!');
      return; // Stop execution if it exists
    }

    // Create the todo object and add it to `todos` array
    const newTodo = {
      text: todoText,
      completed: false,
      id: uuid.v4(), // Generate a new UUID for each todo
    };
    todos.push(newTodo);

    addNewTodo(newTodo);
    saveTodoToLocalStorage();
    input.value = ''; // Clear the input
  }
}

function addNewTodo(text) {
  const todoId = uuid.v4(); // Generate a new UUID for each todo

  todos.push({
    text: text,
    completed: false,
    id: todoId,
  });
  saveTodoToLocalStorage();
}

function saveTodoToLocalStorage() {
  localStorage.setItem(localStorageKeyTodos, JSON.stringify(todos));
}

function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.dataset.id = todo.id; // Store the ID as a data attribute
  li.innerHTML = `
        <div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" onchange="toggleComplete(this)">
                    <label class="form-check-label">${todo.text}</label>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeTodo(this)">Remove</button>
            </div>
        </div>
    `;
  // const label = li.querySelector('.form-check-label');
  // label.addEventListener('dblclick', () => editTodoLabel(label));
  document.getElementById('todo-list').appendChild(li);
}

function toggleComplete(checkbox) {
  const label = checkbox.nextElementSibling;
  label.classList.toggle('text-decoration-line-through', checkbox.checked);

  const todoText = label.innerText;
  const todo = todos.find((todo) => todo.text === todoText);
  if (todo) {
    todo.completed = checkbox.checked;
    saveTodoToLocalStorage();
  }
}

function editTodoLabel(label) {
  const originalText = label.innerText;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'form-control';
  input.value = originalText;
  label.replaceWith(input);
  input.focus();

  // Initialize a flag to prevent multiple saves
  let isSaving = false;

  // Define the save function once to use in both listeners
  const saveFunction = () => {
    if (isSaving) return; // Prevent re-entry
    isSaving = true; // Mark as executed
    saveEditedTodo(input, originalText);
  };

  // Event listeners for Enter key and blur event
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      saveFunction();
    }
  });

  input.addEventListener('blur', saveFunction);
}

function saveEditedTodo(input, originalText) {
  const newText = input.value.trim();
  const label = document.createElement('label');
  label.className = 'form-check-label';
  label.innerText = newText || originalText; // Revert if empty
  input.replaceWith(label);

  label.addEventListener('onclick', () => editTodoLabel(label));

  // Update todos array and localStorage
  const todo = todos.find((todo) => todo.text === originalText);
  if (todo && newText) {
    todo.text = newText;
    saveTodoToLocalStorage();
  }
}

function removeTodo(button) {
  const li = button.closest('li'); // Get the parent todo item
  const checkbox = li.querySelector('.form-check-input'); // Get the checkbox element
  // const text = li.querySelector('label').innerText; // Get the todo text
  const todoId = li.dataset.id; // Get the todo ID from the data attribute

  // Check if the todo is unchecked
  if (!checkbox.checked) {
    const confirmRemoval = confirm(
      'This todo is not completed. Are you sure you want to remove it?'
    );
    if (!confirmRemoval) return; // Exit if user cancels
  }

  todos = todos.filter((todo) => todo.id !== todoId); // Remove from the todos array
  saveTodoToLocalStorage(); // Update local storage
  li.remove(); // Remove the item from the DOM
}

function clearCompletedTodos() {
  // Select all the to-do items in the list
  const todoItems = document.querySelectorAll('#todo-list .list-group-item');

  // Filter out completed todos from the DOM and todos array
  todoItems.forEach((item) => {
    const checkbox = item.querySelector('.form-check-input');
    const todoText = item.querySelector('.form-check-label').innerText;

    if (checkbox.checked) {
      // Remove the completed item from the DOM
      item.remove();

      // Update the todos array by filtering out the completed item
      todos = todos.filter((todo) => todo.text !== todoText);
    }
  });

  // Update localStorage to save the modified todos array
  saveTodoToLocalStorage();
}

// Load todos on page load
loadTodos();
