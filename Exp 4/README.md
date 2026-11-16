# Experiment 4: Palindrome Checker

### Aim
Use function types, scope, and closures; apply try-catch; build a palindrome checker.

### Theory
- **Function Types:**
  - *Function Declaration:* `function reverseString(str) { ... }` (hoisted).
  - *Function Expression:* `const isMatching = function(a, b) { ... };` (assigned to variable).
  - *Arrow Function:* `const clean = (str) => ...` (compact ES6 syntax).
- **Scope:** Variables defined outside functions (`globalStatus`) have global scope, while variables inside functions (`reversed`) are local/block scoped.
- **Closure:** A function that retains access to its outer lexical scope variables even after the outer function has closed. `createCounter()` returns an inner function that increments a private `count` variable.
- **`try...catch`:** Catches runtime exceptions. When input is empty or contains no alphanumeric characters after removing punctuation, `throw new Error(...)` raises an error caught by the `catch` block.

### Code

#### File 1: `script.js`
```javascript
// 1. Global Scope
let globalStatus = "Ready";

// 2. Closure: Encapsulates a private counter
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const getCount = createCounter();

// 3. Arrow Function: clean input string (removes punctuation/spaces and converts to lowercase)
const clean = (str) => str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

// 4. Function Declaration: reverse string
function reverseString(str) {
    let reversed = str.split("").reverse().join(""); // local scope
    return reversed;
}

// 5. Function Expression: compare original and reversed
const isMatching = function(a, b) {
    return a === b;
};

// 6. Main function demonstrating try...catch with punctuation check
function checkPalindrome() {
    const input = document.getElementById("userInput").value;
    const errorEl = document.getElementById("error");
    const outputEl = document.getElementById("output");

    errorEl.innerText = "";
    outputEl.innerHTML = "";

    try {
        if (!input.trim()) {
            throw new Error("Input cannot be empty.");
        }

        const cleaned = clean(input);
        if (cleaned.length === 0) {
            throw new Error("Input must contain at least one letter or number.");
        }

        const reversed = reverseString(cleaned);
        const result = isMatching(cleaned, reversed);
        const totalChecks = getCount();

        globalStatus = "Checked";

        outputEl.innerHTML = `
            <p>Original: ${input}</p>
            <p>Processed: ${cleaned}</p>
            <p>Reversed: ${reversed}</p>
            <p><strong>Verdict: ${result ? "Palindrome" : "Not a Palindrome"}</strong></p>
            <p>Total Checks (Closure): ${totalChecks}</p>
        `;
    } catch (err) {
        errorEl.innerText = err.message;
    }
}
```

#### File 2: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exp 4 - Palindrome Checker</title>
</head>
<body>
    <h2>Palindrome Checker</h2>

    <label>Enter Word or Number: </label>
    <input type="text" id="userInput">
    <button onclick="checkPalindrome()">Check</button>

    <p id="error" style="color: red;"></p>
    <div id="output"></div>

    <script src="script.js"></script>
</body>
</html>
```

### Output
With valid palindrome input (`racecar`):
```text
Original: racecar
Processed: racecar
Reversed: racecar
Verdict: Palindrome
Total Checks (Closure): 1
```

With punctuation input only (`!@#$%`):
```text
Input must contain at least one letter or number.
```

With empty input:
```text
Input cannot be empty.
```

### Conclusion
The palindrome checker was successfully built using JavaScript. The program clearly demonstrated function declarations, function expressions, arrow functions, global and local scoping, closures for private state tracking, and exception handling using `try...catch` with input validation against empty and symbol-only inputs.
