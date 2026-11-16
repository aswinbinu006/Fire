const taskList = document.getElementById("taskList");

// 1. createElement and appendChild with safe text insertion
function addTask(text) {
    const input = document.getElementById("taskInput");
    const taskText = text || input.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.style.margin = "6px 0";

    // Safe text insertion using textContent to prevent HTML injection
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);

    // Action buttons
    const btnGroup = document.createElement("span");
    btnGroup.innerHTML = `
        <button onclick="moveUp(this)">↑</button>
        <button onclick="moveDown(this)">↓</button>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    li.appendChild(btnGroup);

    taskList.appendChild(li);
    if (!text) input.value = "";
}

// 2. Sibling traversal: previousElementSibling & insertBefore
function moveUp(btn) {
    const li = btn.closest("li");
    const prev = li.previousElementSibling;
    if (prev) {
        taskList.insertBefore(li, prev);
    }
}

// 3. Sibling traversal: nextElementSibling & insertBefore
function moveDown(btn) {
    const li = btn.closest("li");
    const next = li.nextElementSibling;
    if (next) {
        taskList.insertBefore(next, li);
    }
}

// 4. Edit task content safely using textContent
function editTask(btn) {
    const span = btn.closest("li").querySelector("span");
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}

// 5. Delete: element.remove()
function deleteTask(btn) {
    btn.closest("li").remove();
}

// Starter tasks
window.onload = function() {
    addTask("Task 1: Learn DOM Traversal");
    addTask("Task 2: Practice Sibling Navigation");
};
