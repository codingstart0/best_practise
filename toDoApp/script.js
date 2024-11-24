const localStorageKeyTodos = 'todos';
let todos = [];
let lastIndex = 0;

function registerTodoEvents() {
  document
    .getElementById('new-todo-form')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      addTodo();
    });

  document
    .getElementById('hide-todos')
    .addEventListener('click', hideCompletedTodos);

  document.getElementById('show-todos').addEventListener('click', showAllTodos);

  document
    .getElementById('clear-completed-todos')
    .addEventListener('click', clearCompletedTodos);

  document
    .getElementById('clear-all-todos')
    .addEventListener('click', clearAllTodos);
}

function loadTodos() {
  try {
    todos = JSON.parse(localStorage.getItem(localStorageKeyTodos)) || [];
    todos?.forEach((todo) => {
      addTodoToDOM(todo);
    });
  } catch (err) {
    console.error(err);
    localStorage.setItem(localStorageKeyTodos, JSON.stringify([]));
  }
  console.table(todos);
}

function getAllTodosText() {

  return todos.map((todo) => {

    return todo.text.toUpperCase();
  });
}

function addTodo() {
  const input = document.getElementById('todo-input');
  let todoText = input.value.trim();
  const existingTodosText = getAllTodosText(); // Get existing todos from the DOM

  if (todoText) {
    todoText =
      todoText.charAt(0).toUpperCase() + todoText.slice(1).toLowerCase();

    if (existingTodosText.includes(todoText.toUpperCase())) {
      // TODO: pakeisti i modal
      alert('This todo already exists!');

      return; // Stop execution if it exists
    }
    const todo = addNewTodo(todoText);
    addTodoToDOM(todo);
    saveTodoToLocalStorage(todos);
    input.value = ''; // Clear the input
  }
}

function getTodoById(todoId) {

  return todos.find((todo) => {

    return todo.id === todoId;
  });
}

function addNewTodo(text) {
  const todoId = uuid.v4(); // Generate a new UUID for each todo
  const todo = {
    text: text,
    completed: false,
    id: todoId,
  };

  todos.push(todo);
  
  return todo;
}

function saveTodoToLocalStorage(todoItemsArray) {
  localStorage.setItem(
    localStorageKeyTodos,
    JSON.stringify(todoItemsArray || [])
  );
  console.table(todoItemsArray);
}

function createTodoLabel(todo) {
  const label = document.createElement('label');
  label.className = 'form-check-label';
  label.innerText = todo.text;
  label.addEventListener('click', editTodo.bind(null, todo));

  return label;
}

function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.className = 'list-group-item todo-item';
  li.id = `todo-id-${todo.id}`;

  li.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
        <div class="form-check">
            <input type="checkbox" class="form-check-input" ${
              todo.completed ? 'checked="checked"' : ''
            }>
        </div>
        <button class="btn btn-danger btn-sm">Remove</button>
    </div>
  `;

  const formCheckDiv = li.querySelector('.form-check');
  const checkbox = formCheckDiv.querySelector('input[type="checkbox"]');
  const label = createTodoLabel(todo); // Use the function
  formCheckDiv.appendChild(label);

  // Bind onchange to the checkbox, not the li
  checkbox.onchange = toggleComplete.bind(this, todo.id);

  const removeBtn = li.querySelector('.btn-danger');
  removeBtn.addEventListener('click', (event) => {
    removeTodo(event, todo);
  });

  document.getElementById('todo-list').appendChild(li);
}

function editTodo(todo, event) {
  const labelElement = event.target;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'form-control';
  input.value = todo.text;
  labelElement.replaceWith(input);
  input.focus();

  // Event listeners for Enter key and blur event
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      input.blur();
    }
  });

  input.addEventListener('blur', () => {
    saveEditedTodo(input, todo);
  });
}

function saveEditedTodo(input, todo) {
  const newText = input.value.trim() || todo.text; // Revert if empty
  const label = createTodoLabel({ ...todo, text: newText }); // Use the function with updated text

  const updatedTodos = todos.map((todoItem) => {
    if (todoItem.id === todo.id) {

      // Return a new object to ensure immutability
      return { ...todoItem, text: newText };
    }

    return todoItem;
  });

  todos = updatedTodos; // Update the todos array globally
  input.replaceWith(label); // Replace the input with the updated label
  saveTodoToLocalStorage(updatedTodos); // Save the updated todos array
}

function toggleComplete(todoId, event) {
  const todo = getTodoById(todoId);
  const checkbox = event.target;

  if (todo && checkbox) {
    todo.completed = checkbox.checked;
    saveTodoToLocalStorage(todos);
  }
}

function removeTodo(event, todo) {
  const button = event.target;
  const li = button.closest('li'); // Get the parent todo item

  const removeElementAndSave = () => {
    todos = todos.filter((todoItem) => todoItem.id !== todo.id); // Update in-memory todos
    saveTodoToLocalStorage(todos); // Save updated todos to local storage
    li.remove();
  };

  if (todo.completed) {
    removeElementAndSave();
  } else {
    // TODO: Pakeisti i modal
    const confirmDelete = window.confirm(
      'This todo is not finished. Do you really want to delete it?'
    );
    if (confirmDelete) {
      removeElementAndSave();
    }
  }
}

function clearCompletedTodos() {
  todos = todos.filter((todoItem) => {
    const todoElement = document.getElementById(`todo-id-${todoItem.id}`);
    if (todoItem.completed) {
      todoElement?.remove();

      return false;
    }

    return true;
  });
  saveTodoToLocalStorage(todos);
}

function hideCompletedTodos() {
  todos.forEach((todoItem) => {
    const todoElement = document.getElementById(`todo-id-${todoItem.id}`);
    if (todoElement)
      // Hide or show based on the 'completed' status
      todoElement.style.display = todoItem.completed ? 'none' : 'block';
  });
}

function showAllTodos() {
  todos.forEach((todoItem) => {
    const todoElement = document.getElementById(`todo-id-${todoItem.id}`);
    if (todoElement) todoElement.style.display = 'block';
  });
}

function clearAllTodos() {
  document.querySelectorAll('.todo-item').forEach((element) => {
    element.remove();
  });
  todos = [];

  saveTodoToLocalStorage(todos);
}

registerTodoEvents();

// Load todos on page load
loadTodos();
