// https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js

document.getElementById('add-todo').addEventListener('click', function() {
  const input = document.getElementById('todo-input');
  const todoText = input.value;

  if (todoText) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
          ${todoText}
          <button class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">Remove</button>
      `;

      document.getElementById('todo-list').appendChild(li);
      input.value = ''; // Clear the input
  }
});