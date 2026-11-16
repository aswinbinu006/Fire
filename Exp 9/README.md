# Experiment 9: Web Storage API (Theme Settings)

### Aim
Implement localStorage and sessionStorage to save user preferences like theme settings.

### Theory
The Web Storage API allows web applications to store key-value pairs locally within the user's browser:
- **`localStorage`:** Data is stored with no expiration time. It persists even after the browser is closed and reopened, and is shared across all tabs with the same origin.
- **`sessionStorage`:** Data is scoped strictly to the current browser tab and lifetime of the session. When the tab or window is closed, the stored data is automatically cleared.
- **Methods:**
  - `setItem(key, value)`: Stores a key-value pair.
  - `getItem(key)`: Retrieves value for a key (returns `null` if absent).
  - `removeItem(key)`: Deletes key from storage.

### Code

#### File 1: `script.js`
```javascript
const themeSelect = document.getElementById("themeSelect");

// Apply theme to body
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.style.backgroundColor = "#222222";
        document.body.style.color = "#ffffff";
        themeSelect.value = "dark";
    } else {
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#000000";
        themeSelect.value = "light";
    }
}

// 1. localStorage (Persistent across browser restarts)
function saveLocal() {
    const theme = themeSelect.value;
    localStorage.setItem("theme", theme);
    sessionStorage.removeItem("theme");
    applyTheme(theme);
    updateDisplay("Saved to localStorage (persists after browser closes).");
}

// 2. sessionStorage (Active only for this tab)
function saveSession() {
    const theme = themeSelect.value;
    sessionStorage.setItem("theme", theme);
    localStorage.removeItem("theme");
    applyTheme(theme);
    updateDisplay("Saved to sessionStorage (cleared when tab closes).");
}

// 3. Clear preferences
function clearStorage() {
    localStorage.removeItem("theme");
    sessionStorage.removeItem("theme");
    applyTheme("light");
    updateDisplay("Cleared all preferences.");
}

// Update text display
function updateDisplay(message) {
    document.getElementById("localStatus").innerText = localStorage.getItem("theme");
    document.getElementById("sessionStatus").innerText = sessionStorage.getItem("theme");
    document.getElementById("msg").innerText = message || "";
}

// Load on page startup
window.onload = function() {
    const saved = sessionStorage.getItem("theme") || localStorage.getItem("theme") || "light";
    applyTheme(saved);
    updateDisplay("Loaded theme from storage.");
};
```

#### File 2: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exp 9 - Web Storage</title>
</head>
<body>
    <h2>Theme Settings (Web Storage)</h2>

    <label>Select Theme: </label>
    <select id="themeSelect" onchange="applyTheme(this.value)">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
    <br><br>

    <button onclick="saveLocal()">Save using localStorage</button>
    <button onclick="saveSession()">Save using sessionStorage</button>
    <button onclick="clearStorage()">Clear Preferences</button>

    <h3>Storage Status</h3>
    <p>localStorage value: <strong id="localStatus">null</strong></p>
    <p>sessionStorage value: <strong id="sessionStatus">null</strong></p>
    <p id="msg"></p>

    <script src="script.js"></script>
</body>
</html>
```

### Output
1. Selecting **Dark** and clicking **Save using localStorage**:
   - Page background becomes dark (`#222222`) and text turns white.
   - `localStorage value: dark`, `sessionStorage value: null`
   - Closing and reopening the browser retains the dark background.
2. Selecting **Dark** and clicking **Save using sessionStorage**:
   - `localStorage value: null`, `sessionStorage value: dark`
   - Reopening the page in a new tab opens in the default light theme.
3. Clicking **Clear Preferences**:
   - Both storages show `null` and the theme resets to Light.

### Conclusion
The Web Storage APIs were successfully implemented using JavaScript. The program demonstrated saving, retrieving, and clearing preferences using both `localStorage` and `sessionStorage`, and established the difference in their persistence lifecycles.
