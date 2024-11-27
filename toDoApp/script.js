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
    todos.push(todo);
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

function getTodoElementById(todoId) {
  return document.getElementById(`todo-id-${todoId}`);
}

function addNewTodo(text) {
  const todoId = uuid.v4(); // Generate a new UUID for each todo
  const todo = {
    text: text,
    completed: false,
    id: todoId,
  };

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
  label.className = 'todo-label';
  label.innerText = todo.text;
  label.addEventListener('click', (event) => {
    editTodo(todo, event);
  });

  return label;
}

function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.className = 'list-group-item todo-item';
  li.id = `todo-id-${todo.id}`;

  li.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
        <div class="todo-checkbox-and-label-wrapper">
            <input type="checkbox" class="form-check-input" ${
              todo.completed ? 'checked="checked"' : ''
            } />
        </div>
        <button class="btn btn-danger btn-sm">Remove</button>
    </div>
  `;

  const todoCheckboxAndLabelWrapperElement = li.querySelector(
    '.todo-checkbox-and-label-wrapper'
  );
  const checkbox = todoCheckboxAndLabelWrapperElement.querySelector(
    'input[type="checkbox"]'
  );
  const label = createTodoLabel(todo); // Use the function

  todoCheckboxAndLabelWrapperElement.appendChild(label);

  // Bind onchange to the checkbox, not the li
  checkbox.addEventListener('change', (event) => {
    toggleComplete(todo.id, event);
  });

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

  input.addEventListener('blur', () => {
    saveEditedTodo(input, todo);
  });

  // Event listeners for Enter key and blur event
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      input.blur();
    }
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

  input.replaceWith(label); // Replace the input with the updated label
  todos = updatedTodos; // Update the todos array globally
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

function removeTodoItem(todoId) {
  const updatedTodos = todos.filter((todoItem) => todoItem.id !== todoId);
  todos = updatedTodos;
  saveTodoToLocalStorage(updatedTodos);
}

function removeTodoElement(todoId) {
  const todoElement = getTodoElementById(todoId);

  if (todoElement) {
    todoElement.remove();
  }
}

function removeTodo(event, todo) {
  const removeTodoItemAndElement = () => {
    removeTodoItem(todo.id);
    removeTodoElement(todo.id);
  };

  if (todo.completed) {
    removeTodoItemAndElement();
  } else {
    // TODO: Pakeisti i modal
    const confirmDelete = window.confirm(
      'This todo is not finished. Do you really want to delete it?'
    );
    if (confirmDelete) {
      removeTodoItemAndElement();
    }
  }
}

function clearCompletedTodos() {
  todos.forEach((todo) => {
    if (todo.completed) {
      removeTodoElement(todo.id);
      removeTodoItem(todo.id);
    }
  });
}

function hideCompletedTodos() {
  todos.forEach((todoItem) => {
    const todoElement = getTodoElementById(todoItem.id);
    if (todoElement)
      if (todoItem.completed) {
        // Hide or show based on the 'completed' status
        todoElement.classList.add('d-none');
      } else {
        todoElement.classList.remove('d-none');
      }
  });
}

function showAllTodos() {
  todos.forEach((todoItem) => {
    const todoElement = getTodoElementById(todoItem.id);
    if (todoElement) {
      todoElement.classList.remove('d-none');
    }
  });
}

function clearAllTodos() {
  todos.forEach((todo) => {
    removeTodoElement(todo.id);
    removeTodoItem(todo.id);
  });
}

registerTodoEvents();

// Load todos on page load
loadTodos();
