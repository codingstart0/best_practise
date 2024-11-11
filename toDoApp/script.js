const localStorageKeyTodos = 'todos';
let todos = [];
let lastIndex = 0;

document.getElementById('new-todo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});
document
  .getElementById('hide-todos')
  .addEventListener('click', hideCompletedTodos);

document
  .getElementById('show-todos')
  .addEventListener('click', showAllTodos);

document
  .getElementById('clear-completed-todos')
  .addEventListener('click', clearCompletedTodos);

// document
//   .getElementById('clear-all-todos')
//   .addEventListener('click', clearAllTodos);

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
    addNewTodo(todoText);
    addTodoToDOM(todoText);
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

function addTodoToDOM(text) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `
        <div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" onchange="toggleComplete(this)">
                    <label class="form-check-label">${text}</label>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeTodo(this)">Remove</button>
            </div>
        </div>
    `;
  const label = li.querySelector('.form-check-label');
  label.addEventListener('dblclick', () => editTodoLabel(label));
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
  const text = li.querySelector('label').innerText; // Get the todo text
  const checkbox = li.querySelector('.form-check-input'); // Get the checkbox element

  // Remove from the todos array
  todos = todos.filter((todo) => todo.text !== text);

  if (!checkbox.checked) {
    const confirmDelete = window.confirm(
      'This todo is not finished. Do you really want to delete it?'
    );
    if (!confirmDelete) {
      // If the user clicks "Cancel", stop the deletion process
      todos.push({ text, completed: false }); // Re-add the todo to the array (optional)
      // saveTodoToLocalStorage(); // Optionally save to local storage if needed
      return; // Stop execution to prevent deletion
    }
  }

  // Update local storage
  saveTodoToLocalStorage();

  // Remove the item from the DOM
  li.remove();
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

function hideCompletedTodos() {
  // Select all the to-do items in the list
  const todoItems = document.querySelectorAll('#todo-list .list-group-item');

  // Filter out completed todos from the DOM and todos array
  todoItems.forEach((item) => {
    const checkbox = item.querySelector('.form-check-input');

    // Log checkbox status to verify if it's correctly detecting checked status
    console.log(
      `Todo: ${item.querySelector('.form-check-label').innerText}, Completed: ${
        checkbox.checked
      }`
    );

    // Hide item if it’s completed
    if (checkbox.checked) {
      item.style.display = 'none'; // Hide the item visually
    } else {
      item.style.display = 'block'; // Show the item if it's not completed
    }
  });
}

function showAllTodos() {
  // Select all todo items and reset their display
  const todoItems = document.querySelectorAll('#todo-list .list-group-item');
  todoItems.forEach(item => {
    item.style.display = 'block';
  });
}

// Load todos on page load
loadTodos();
