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
