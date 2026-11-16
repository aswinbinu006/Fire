# Experiment 10: Asynchronous JSON Loading (fetch & $.getJSON)

### Aim
Load and display JSON data using fetch() and jQuery $.getJSON(); render results dynamically in a table.

### Theory
- **JSON (JavaScript Object Notation):** A standard text-based format for representing structured data based on JavaScript object syntax.
- **`fetch()` API (Native & Offline-Ready):** Built-in browser method that returns a Promise resolving to a Response object. Calling `response.json()` parses the JSON stream into a JavaScript object/array. It requires **zero external libraries** and works completely offline without internet.
- **jQuery `$.getJSON()` (External Dependency):** Shorthand Ajax method that sends an HTTP GET request to a file, parses the returned JSON automatically, and executes `.done(callback)` with the parsed data.
- **Offline Considerations & Local jQuery:**
  - In an offline laboratory environment without internet access, online CDN scripts fail to load, causing `$` to be undefined.
  - To guarantee 100% offline functionality, `jquery-3.7.1.min.js` is provided locally in this directory and linked via `<script src="jquery-3.7.1.min.js"></script>`.
- **HTTP Server Requirement (CORS Policy):**
  - Web browsers block asynchronous requests (`fetch` and `XMLHttpRequest`) when opening HTML files directly from disk (`file:///`) due to Cross-Origin Resource Sharing (CORS) security policies.
  - The files must be served over HTTP, such as by right-clicking `index.html` in VS Code and choosing **"Open with Live Server"** (`http://127.0.0.1:5500`).

### Code

#### File 1: `data.json`
```json
[
  { "id": 101, "name": "Aarav Sharma", "dept": "Computer Science", "marks": 88 },
  { "id": 102, "name": "Diya Patel", "dept": "Information Technology", "marks": 92 },
  { "id": 103, "name": "Rohan Deshmukh", "dept": "Data Science", "marks": 79 },
  { "id": 104, "name": "Sneha Nair", "dept": "AI & ML", "marks": 95 }
]
```

#### File 2: `script.js`
```javascript
// Function to render data array into HTML table
function renderTable(data, method) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.dept}</td>
            <td>${item.marks}</td>
        </tr>
    `).join("");

    document.getElementById("status").innerText = `Loaded ${data.length} records using ${method}.`;
}

// 1. Native ES6 fetch() API
function loadWithFetch() {
    fetch("data.json")
        .then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.json();
        })
        .then(data => renderTable(data, "fetch()"))
        .catch(err => {
            alert("fetch() error: " + err.message + "\nTip: Open with VS Code Live Server to bypass file:// CORS policy.");
        });
}

// 2. jQuery $.getJSON() Method
function loadWithJQuery() {
    $.getJSON("data.json")
        .done(data => renderTable(data, "jQuery $.getJSON()"))
        .fail(() => {
            alert("$.getJSON() error!\nTip: Open with VS Code Live Server to bypass file:// CORS policy.");
        });
}

// 3. Reset table
function resetTable() {
    document.getElementById("tableBody").innerHTML = `
        <tr><td colspan="4" align="center">No data loaded yet.</td></tr>
    `;
    document.getElementById("status").innerText = "";
}
```

#### File 3: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exp 10 - Loading JSON</title>
    <!-- Local jQuery file for 100% offline lab environment support -->
    <script src="jquery-3.7.1.min.js"></script>
</head>
<body>
    <h2>Load and Display JSON Data</h2>
    <p><em>(Serve via VS Code Live Server or a local HTTP server to load data.json)</em></p>

    <button onclick="loadWithFetch()">Load using fetch()</button>
    <button onclick="loadWithJQuery()">Load using $.getJSON()</button>
    <button onclick="resetTable()">Reset</button>

    <p id="status" style="font-weight: bold;"></p>

    <table border="1" cellpadding="6">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Marks</th>
            </tr>
        </thead>
        <tbody id="tableBody">
            <tr>
                <td colspan="4" align="center">No data loaded yet.</td>
            </tr>
        </tbody>
    </table>

    <script src="script.js"></script>
</body>
</html>
```

### Output
When clicking **Load using fetch()** or **Load using $.getJSON()**:
- **Status:** `Loaded 4 records using fetch().` (or `Loaded 4 records using jQuery $.getJSON().`)
- **Table populated:**

| ID | Name | Department | Marks |
| :--- | :--- | :--- | :--- |
| 101 | Aarav Sharma | Computer Science | 88 |
| 102 | Diya Patel | Information Technology | 92 |
| 103 | Rohan Deshmukh | Data Science | 79 |
| 104 | Sneha Nair | AI & ML | 95 |

### Conclusion
Asynchronous data retrieval was successfully implemented using both the native JavaScript `fetch()` API and jQuery's `$.getJSON()` method. The JSON records were parsed and rendered dynamically into an HTML table using a local server setup and local jQuery dependency for offline stability.
