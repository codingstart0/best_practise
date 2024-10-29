// https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js

document.getElementById('add-todo').addEventListener('click', function() {
  const input = document.getElementById('todo-input');
  const todoText = input.value;

  if (todoText) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
      <div class="form-check">
          <input type="checkbox" class="form-check-input" onchange="toggleComplete(this)">
          <label class="form-check-label">${todoText}</label>
      </div>
      <button class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">Remove</button>
  `;

      document.getElementById('todo-list').appendChild(li);
      input.value = ''; // Clear the input
  }
});

function toggleComplete(checkbox) {
  const label = checkbox.nextElementSibling; // Get the label
  if (checkbox.checked) {
      label.classList.add('text-decoration-line-through'); // Add a strikethrough class
  } else {
      label.classList.remove('text-decoration-line-through'); // Remove strikethrough
  }
}