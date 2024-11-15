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
  localStorage.setItem(localStorageKeyTodos, JSON.stringify(todoItemsArray));
  console.table(todoItemsArray);
}

function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `
    <div class="d-flex justify-content-between align-items-center todo-item">
        <div class="form-check">
            <input type="checkbox" class="form-check-input" ${
              todo.completed ? 'checked="checked"' : ''
            }>
            <label class="form-check-label">${todo.text}</label>
        </div>
        <button class="btn btn-danger btn-sm">Remove</button>
    </div>
  `;
  li.id = `todo-id-${todo.id}`;

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
  const newText = input.value.trim() || todo.text; // Revert if empty
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
}

function clearCompletedTodos() {
  const filteredTodos = todos.filter((todoItem) => {
    if (todoItem.completed) {
      const todoElement = document.getElementById(`todo-id-${todoItem.id}`);
      todoElement?.remove();

      return false;
    }

    return true;
  });

  // Update localStorage to save the modified todos array
  saveTodoToLocalStorage(filteredTodos);
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
  const resetedTodo = todos.forEach((todoItem) => {
    if (todoItem) {
      const todoElement = document.getElementById(`todo-id-${todoItem.id}`);
      todoElement.remove();
    }
  });
  saveTodoToLocalStorage();
}

// function clearAllTodos() {
//   todos.forEach((todoItem) => {
//     const todoElement = document.getElementById(`todo-id-${todoItem.id}`);
//     if (todoElement) {
//       todoElement.remove();
//     }

//     // Clear the todos array
//     todos.length = 0;

//     // Update localStorage to save the modified todos array
//     saveTodoToLocalStorage();
//   });
// }

registerTodoEvents();

// Load todos on page load
loadTodos();
