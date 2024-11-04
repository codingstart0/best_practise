const localStorageKeyTodos = 'todos';
let todos = [];
let lastIndex = 0;

document.getElementById('add-todo').addEventListener('click', addTodo);
document
  .getElementById('todo-input')
  .addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

function loadTodos() {
  try {
    todos = JSON.parse(localStorage.getItem(localStorageKeyTodos)) || [];
    todos.forEach((todo) => {
      addTodoToDOM(todo.text, todo.tasks);
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
  const todoText = input.value;
  const existingTodos = getExistingTodos();

  if (todoText) {
    if (existingTodos.includes(todoText)) {
      alert('This todo already exists!');
      return; // Stop execution if it exists
    }
    addNewTodo(todoText);
    addTodoToDOM(todoText, []); // Pass an empty array for tasks
    saveTodoToLocalStorage(); // Save empty tasks array
    input.value = ''; // Clear the input
  }
}

function addNewTodo(text) {
  todos.push({
    id: lastIndex,
    text: text,
    tasks: [],
  });
  lastIndex++;
}

function saveTodoToLocalStorage() {
  localStorage.setItem(localStorageKeyTodos, JSON.stringify(todos));
}

function addTodoToDOM(text, tasks) {
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
            <ul class="list-group mt-2 task-list">
                ${tasks
                  .map((task) => `<li class="list-group-item">${task}</li>`)
                  .join('')}
            </ul>
            <div class="input-group mt-2">
                <input type="text" class="form-control" placeholder="Add a task">
                <button class="btn btn-success btn-sm" onclick="addTask(this)">Add Task</button>
            </div>
        </div>
    `;
  document.getElementById('todo-list').appendChild(li);
}

function addTask(button) {
  const input = button.previousElementSibling; // Get the input field
  const taskText = input.value;

  if (taskText) {
    const taskList = button.closest('li').querySelector('.task-list'); // Find the task list
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = taskText;
    taskList.appendChild(li);
    input.value = ''; // Clear the input
  }
}

function toggleComplete(checkbox) {
  const label = checkbox.nextElementSibling;
  label.classList.toggle('text-decoration-line-through', checkbox.checked);
}

function removeTodo(button) {
  const li = button.closest('li'); // Get the parent todo item
  const text = li.querySelector('label').innerText; // Get the todo text
  li.remove();

  // Remove from local storage logic here if needed
}

// Load todos on page load
loadTodos();
