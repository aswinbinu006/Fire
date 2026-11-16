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
