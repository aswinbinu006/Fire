# Experiment 7: DOM Traversal and Manipulation (To-Do List)

### Aim
Perform DOM traversal and updates; develop a to-do list app with add, edit, and delete features.

### Theory
The Document Object Model (DOM) represents HTML as a tree of nodes. Key manipulation and traversal methods include:
- **`document.createElement('li')`**: Creates a new HTML element node dynamically.
- **Safe Text Insertion (`textContent`)**: Setting user input via `span.textContent` prevents arbitrary HTML injection (XSS).
- **`parentElement.appendChild(node)`**: Appends a node to the bottom of the parent list.
- **`element.closest('li')`**: Traverses up the DOM hierarchy to find the nearest ancestor matching the selector.
- **`node.previousElementSibling` & `node.nextElementSibling`**: Traverses horizontally to the preceding or following sibling element.
- **`parentElement.insertBefore(newNode, refNode)`**: Moves or places a node directly before a reference node (used to move tasks up or down).
- **`element.remove()`**: Deletes a node from the document.

### Code

#### File 1: `script.js`
```javascript
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
```

#### File 2: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exp 7 - DOM Traversal & Task List</title>
</head>
<body>
    <h2>To-Do List (DOM Traversal)</h2>

    <input type="text" id="taskInput" placeholder="Enter task">
    <button onclick="addTask()">Add Task</button>

    <ul id="taskList"></ul>

    <script src="script.js"></script>
</body>
</html>
```

### Output
- On load, two initial tasks appear with buttons: `[↑]`, `[↓]`, `[Edit]`, and `[Delete]`.
- Typing `"New Task"` and clicking **Add Task** creates and safely appends a new `<li>` element using `textContent`.
- Clicking **↑** or **↓** moves tasks using sibling traversal (`previousElementSibling` / `nextElementSibling` and `insertBefore`).
- Clicking **Edit** opens a prompt dialog to update the task text safely.
- Clicking **Delete** removes the task from the DOM using `element.remove()`.

### Conclusion
The to-do list application successfully demonstrated DOM creation, updates, deletion, and traversal methods in JavaScript. Elements were added safely via `createElement` and `textContent`, reordered using sibling traversal (`previousElementSibling`, `nextElementSibling`), and removed using `remove()`.
