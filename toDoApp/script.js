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
    todos.forEach((todo) => {
      addTodoToDOM(todo);
    });
  } catch (err) {
    alert(err.message);
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
      // if (existingTodos.includes(todoText))
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
  console.log('SAVING');
  localStorage.setItem(localStorageKeyTodos, JSON.stringify(todoItemsArray));
  console.table(todoItemsArray);
}

function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `
    <div class="d-flex justify-content-between align-items-center todo-item" id="todo-id-${
      todo.id
    }">
        <div class="form-check">
            <input type="checkbox" class="form-check-input" ${
              todo.completed ? 'checked="checked"' : ''
            }>
            <label class="form-check-label">${todo.text}</label>
        </div>
        <button class="btn btn-danger btn-sm">Remove</button>
    </div>
  `;

  li.onchange = toggleComplete.bind(this, todo.id);

  const label = li.querySelector('.form-check-label');
  const removeBtn = li.querySelector('.btn-danger');

  label.addEventListener('click', editTodo.bind(null, todo));
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

  console.log('focus');

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
  const newText = input.value.trim() ?? todo.text; // Revert if empty
  const label = document.createElement('label');
  label.className = 'form-check-label';
  label.innerText = newText;

  // const updatedTodo = todos.find((_todo) => _todo.id === todo.id);

  const updatedTodos = todos.map((todoItem) => {
    if (todoItem.id === todo.id) {
      todoItem.text = newText;
      input.replaceWith(label);
      label.addEventListener('click', editTodo.bind(null, todoItem));
    }

    return todoItem;
  });

  saveTodoToLocalStorage(updatedTodos);

  // if (updatedTodo && newText) {
  //   updatedTodo.text = newText;
  //   saveTodoToLocalStorage(todos);

  //   input.replaceWith(label);
  //   label.addEventListener('click', editTodo.bind(null, updatedTodo));
  // }
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
  console.log(todo);
  console.log(event);
  const button = event.target;
  const li = button.closest('li'); // Get the parent todo item
  // const text = li.querySelector('label').innerText; // Get the todo text
  // const checkbox = li.querySelector('.form-check-input'); // Get the checkbox element

  console.log('removeTodo', button);
  // Remove from the todos array

  const removeElementAndSave = () => {
    const filteredTodos = todos.filter((todoItem) => todoItem.id !== todo.id);
    saveTodoToLocalStorage(filteredTodos);
    li.remove();
  };

  if (todo.completed) {
    removeElementAndSave();
  } else {
    const confirmDelete = window.confirm(
      'This todo is not finished. Do you really want to delete it?'
    );
    if (confirmDelete) {
      removeElementAndSave();
    }
  }

  // Remove the item from the DOM
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
  saveTodoToLocalStorage(todos);
}

function hideCompletedTodos() {
  // Select all the to-do items in the list
  const todoItems = document.querySelectorAll('#todo-list .list-group-item');

  // Filter out completed todos from the DOM and todos array
  todoItems.forEach((item) => {
    const checkbox = item.querySelector('.form-check-input');

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
  todoItems.forEach((item) => {
    item.style.display = 'block';
  });
}

function clearAllTodos() {
  // Select all todo items and reset their display
  const todoItems = document.querySelectorAll('#todo-list .list-group-item');

  // Filter out completed todos from the DOM and todos array
  todoItems.forEach((item) => {
    const todoText = item.querySelector('.form-check-label').innerText;

    item.remove();

    // Update the todos array by filtering out the completed item
    todos = todos.filter((todo) => todo.text !== todoText);
  });

  // Update localStorage to save the modified todos array
  saveTodoToLocalStorage(todos);
}

registerTodoEvents();

// Load todos on page load
loadTodos();
