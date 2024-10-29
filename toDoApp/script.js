document.getElementById('add-todo').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { // Check if the Enter key is pressed
        addTodo(); // Call the function to add a todo
    }
});

function addTodo() {
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
}

function toggleComplete(checkbox) {
    const label = checkbox.nextElementSibling; // Get the label
    if (checkbox.checked) {
        label.classList.add('text-decoration-line-through'); // Add Bootstrap class for strikethrough
    } else {
        label.classList.remove('text-decoration-line-through'); // Remove Bootstrap class for strikethrough
    }
}