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
